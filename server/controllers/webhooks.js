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
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Use the raw body for verification and parsing
        const payload = req.body; // Buffer (because of bodyParser.raw)
        const payloadString = payload.toString();
        console.log("Verifying webhook signature...");
        await whook.verify(payloadString, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });
        console.log("Webhook signature verified!");

        const { data, type } = JSON.parse(payloadString);
        console.log("Webhook type:", type);

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                console.log("User data to create:", userData);
                await User.create(userData);
                console.log("User created!");
                res.json({});
                break;
            }
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
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
            default:
                console.log("Unhandled webhook type:", type);
                res.json({});
                break;
        }

    } catch (error) {
        console.error("Webhook error:", error);
        res.status(500).json({ success: false, message: 'Webhooks Error', error: error.message });
    }
}