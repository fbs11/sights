import User from "../models/User.js";

// READ

export const getUser = async (req, res) => {
    try {
        const{id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

export const getUserFriends = async (req, res) => {
    try{
        const{id} = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(  //we use all due to multiple api calls to the db
        user.friends.map((id) => User.findById(id)) //grab each id that the user has to take their info
    );
    const formattedFriends = friends.map ( //formatted to be used in the frontend
        ({_id, firstName, lastName, occupation, location, picturePath}) => {
            return {_id, firstName, lastName, occupation, location, picturePath};
        }
    );
    res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

// UPDATE

export const addRemoveFriend = async (req, res) => {
    try{
        const{id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId); //removes the id when it equals the filtered one
            friend.friends = friend.friends.filter((id) => id !== id); //removed from his friendlist as well
        } else { //if they are not included we add them
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(  //we use all due to multiple api calls to the db
        user.friends.map((id) => User.findById(id)) //grab each id that the user has to take their info
    );
    const formattedFriends = friends.map (
        ({_id, firstName, lastName, occupation, location, picturePath}) => {
            return {_id, firstName, lastName, occupation, location, picturePath};
        }
    );
    res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}