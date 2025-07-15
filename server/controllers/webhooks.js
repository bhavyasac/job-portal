// import { Webhook } from "svix";
// import User from "../models/User.js";

// export const clerkWebhooks = async (req, res) => {
//     console.log("Webhook endpoint hit");
//     try {
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//         console.log("Verifying webhook signature...");
//         await whook.verify(JSON.stringify(req.body), {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         });
//         console.log("Webhook signature verified!");

//         const { data, type } = req.body;
//         console.log("Webhook type:", type);

//         switch (type) {
//             case 'user.created': {
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + " " + data.last_name,
//                     image: data.image_url,
//                     resume: ''
//                 }
//                 console.log("User data to create:", userData);
//                 await User.create(userData);
//                 console.log("User created!");
//                 res.json({});
//                 break;
//             }
//             case 'user.updated': {
//                 const userData = {
//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + " " + data.last_name,
//                     image: data.image_url,
//                 }
//                 console.log("Updating user:", data.id, userData);
//                 await User.findByIdAndUpdate(data.id, userData);
//                 console.log("User updated!");
//                 res.json({});
//                 break;
//             }
//             case 'user.deleted': {
//                 console.log("Deleting user:", data.id);
//                 await User.findByIdAndDelete(data.id);
//                 console.log("User deleted!");
//                 res.json({});
//                 break;
//             }
//             default:
//                 console.log("Unhandled webhook type:", type);
//                 res.json({});
//                 break;
//         }

//     } catch (error) {
//         console.error("Webhook error:", error);
//         res.status(500).json({ success: false, message: 'Webhooks Error', error: error.message });
//     }
// }

import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
    console.log("Webhook endpoint hit");

    try {
        // // ✅ Check timestamp manually first (before verifying)
        // const currentTimestamp = Math.floor(Date.now() / 1000);
        // const webhookTimestamp = parseInt(req.headers["svix-timestamp"], 10);

        // if (Math.abs(currentTimestamp - webhookTimestamp) > 300) {
        //     throw new Error("Webhook timestamp is too old");
        // }

        // ✅ Proceed with signature verification
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        // console.log("Verifying webhook signature...");
        // console.log("Incoming headers:");
        // console.log(req.headers);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp" : req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"]
        });
        console.log("Webhook signature verified!");

        const { data, type } = req.body
        // console.log("Raw Clerk data:", data);
        // console.log("Webhook type:", type);

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                };
                console.log(" Creating user with data:", userData);
                await User.create(userData);
                res.json({})
                // try {
                //     const createdUser = 
                //     console.log(" User created in DB:", createdUser);
                //     res.status(200).json({ success: true });
                // } catch (dbErr) {
                //     console.error(" DB Error while creating user:", dbErr.message);
                //     return res.status(500).json({ success: false, error: dbErr.message });
                // }
                break;
            }


            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url
                };
                console.log("Updating user:", data.id, userData);
                await User.findByIdAndUpdate(data.id, userData);
                console.log("User updated!");
                res.json({});
                break;
            }

            case 'user.deleted': {
                console.log("Deleting user:", data.id);
                await User.findByIdAndDelete(data.id);
                console.log("User deleted!");
                res.json({});
                break;
            }

            default: {
                break;
            }
        }

    } catch (error) {
        console.error("Webhook error:", error);
        res.status(500).json({ success: false, message: 'Webhooks Error', error: error.message });
    }
};
