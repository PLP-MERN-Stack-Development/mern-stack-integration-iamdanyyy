// postController.js - Controller for post routes

const Post = require('../models/Post');
const { ErrorResponse } = require('../middleware/errorHandler');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const search = req.query.search;

    // Build query
    let query = {};
    if (category) {
      query.category = category;
    }
    if (search) {
      // Search in title or content, and maintain category filter if exists
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
      // If category is also specified, we need to combine them properly
      // The $or will work with the category filter since they're both in the same query object
    }

    // Get posts with pagination
    const posts = await Post.find(query)
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count
    const total = await Post.countDocuments(query);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .populate('comments.user', 'name email');

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    // Increment view count
    post.viewCount += 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res, next) => {
  try {
    // Add author to req.body
    req.body.author = req.user.id;

    // Generate slug from title if not provided
    if (req.body.title && !req.body.slug) {
      let baseSlug = req.body.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
        .trim()
        .replace(/^-+|-+$/g, '');
      
      if (!baseSlug) {
        baseSlug = 'post-' + Date.now();
      }
      
      // Check if slug already exists and append number if needed
      let slug = baseSlug;
      let counter = 1;
      while (await Post.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      
      req.body.slug = slug;
    }

    const post = await Post.create(req.body);

    // Populate author and category
    await post.populate('author', 'name email');
    await post.populate('category', 'name slug');

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    // Make sure user is post owner (or admin in future)
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this post',
      });
    }

    // Generate slug from title if title was modified
    if (req.body.title && req.body.title !== post.title) {
      let baseSlug = req.body.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
        .trim()
        .replace(/^-+|-+$/g, '');
      
      if (!baseSlug) {
        baseSlug = 'post-' + Date.now();
      }
      
      // Check if slug already exists (excluding current post) and append number if needed
      let slug = baseSlug;
      let counter = 1;
      let existingPost = await Post.findOne({ slug, _id: { $ne: req.params.id } });
      while (existingPost) {
        slug = `${baseSlug}-${counter}`;
        counter++;
        existingPost = await Post.findOne({ slug, _id: { $ne: req.params.id } });
      }
      
      req.body.slug = slug;
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('author', 'name email')
      .populate('category', 'name slug');

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    // Make sure user is post owner
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this post',
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Please provide comment content',
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    // Add comment
    post.comments.push({
      user: req.user.id,
      content,
    });

    await post.save();

    // Populate the new comment's user
    await post.populate('comments.user', 'name email');

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

