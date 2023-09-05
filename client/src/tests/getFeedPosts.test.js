import Post from "../models/Post.js";
import getFeedPosts from "../controllers/posts.js"

jest.mock('../models/Post.js'); 

describe('getFeedPosts', () => {
  it('should return all posts', async () => {
    const mockPosts = [{ title: 'Post 1' }, { title: 'Post 2' }];
    Post.find.mockResolvedValue(mockPosts);
    
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getFeedPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Error fetching posts';
    Post.find.mockRejectedValue(new Error(errorMessage));
    
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getFeedPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});