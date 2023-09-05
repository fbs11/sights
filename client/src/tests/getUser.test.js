
import getUser from '../controllers/users'
import User from '../models/User'

jest.mock('./models/user');

describe('getUser', () => {
  it('should return a user', async () => {
    const mockUser = {
      _id: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
    };
    User.findById.mockResolvedValue(mockUser);

    const req = {
      params: { id: 'user1' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should handle errors', async () => {
    const errorMessage = 'User not found';
    User.findById.mockRejectedValue(new Error(errorMessage));

    const req = {
      params: { id: 'user1' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
