

// THIS WAS ADDED BY tqii ----------------------------
process.env.PORT=5001
// ----------------------------

const passportConfig = {
    credentials: {
        tenantID: "bba67e09-06e0-4d07-9123-acdb7a262a91",
        clientID: "303941c0-c24e-44f9-9b3c-d9b2366f22e3"
    },
    metadata: {
        authority: "login.microsoftonline.com",
        discovery: ".well-known/openid-configuration",
        version: "v2.0"
    },
    settings: {
        validateIssuer: true,
        passReqToCallback: true,
        loggingLevel: "info",
        loggingNoPII: true,
    },
    protectedRoutes: {
        todolist: {
            endpoint: "/api/todolist",
            delegatedPermissions: {
                read: ["Todolist.Read", "Todolist.ReadWrite"],
                write: ["Todolist.ReadWrite"]
            },
            applicationPermissions: {
                read: ["Todolist.Read.All", "Todolist.ReadWrite.All"],
                write: ["Todolist.ReadWrite.All"]
            }
        }
    }
}

module.exports = passportConfig;
