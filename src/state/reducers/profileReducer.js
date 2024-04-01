const profileReducer = (profile={
    name: "Овог нэр",
    location: "Төрсөн нутаг",
    github: "",
    linkedin: "",
    website: "",
    email: "",
    contact: "",
}, action) => {
    switch(action.type){
        case "MANAGE_PROFILE":
            return action.payload;
        default:
            return profile;
    }
}
export default profileReducer