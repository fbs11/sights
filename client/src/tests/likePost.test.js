
import { likePost } from "../controllers/posts";
import Post from "../models/Post"

jest.mock('../models/Post');

describe('likePost', () => {
  it('should toggle like status of a post', async () => {
    const mockPost = {
      _id: '123',
      likes: new Map([['user1', true]])
    };
    Post.findById.mockResolvedValue(mockPost);
    Post.findByIdAndUpdate.mockResolvedValue(mockPost);

    const req = {
      params: { id: '123' },
      body: { userId: 'user1' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await likePost(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPost);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Post not found';
    Post.findById.mockRejectedValue(new Error(errorMessage));

    const req = {
      params: { id: '123' },
      body: { userId: 'user1' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await likePost(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
