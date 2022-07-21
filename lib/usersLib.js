//make a small library of actions
import dateNowUnix from "@/utils/dateNowUnix";

const usersLib = {
  //create a new event
  async userExistsOrCreate(db, data) {
    //check if a user exists, if not create one and return the user
    const { email, name, phone, about } = data;

    let user = null;
    try {
      user = await db.collection("users").findOne({ email });
      if (!user) {
        //If not.... we need to register the user first...
        const newUser = await db.collection("users").insertOne({
          email,
          name,
          phone: phone || "",
          roles: ["user"],
          createdAt: dateNowUnix(),
          updatedAt: dateNowUnix(),
          lastLogin: dateNowUnix(),
          emailVerified: Date.now(),
          createdOnPurchase: true,
        });

        user = await db
          .collection("users")
          .findOne({ _id: newUser.insertedId });

        if (about) newUser.about = about;
        return {
          ...user,
          id: newUser.insertedId,
        };
      }

      //if there is user....
      const { phone: userPhone, name: userName } = user;
      if (!userPhone) user.phone = phone;
      if (!userName) user.name = name;

      await db
        .collection("users")
        .updateOne({ _id: user._id }, { $set: { phone, name } });

      if (about) user.about = about;

      return user;
    } catch (error) {
      console.log("error registering user on users collection", error);
      return error;
    }
  },
};

export default usersLib;
