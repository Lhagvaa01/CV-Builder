export const addSkill = (skill) => {
    return (dispatch) => {
        dispatch({
            type: "ADD_SKILL",
            payload: skill
        })
    }
}

export const removeSkill = (index) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_SKILL",
            payload: index
        })
    }
}

export const manageFile = (file) => {
    return (dispatch) => {
        dispatch({
            type: "MANAGE_FILE",
            payload: file
        })
    }
}

export const manageAbout = (about) => {
    return (dispatch) => {
        dispatch({
            type: "MANAGE_ABOUT",
            payload: about
        })
    }
}

export const manageProfile = (profile) => {
    return (dispatch) => {
        dispatch({
            type: "MANAGE_PROFILE",
            payload: profile
        })
    }
}

export const addExperience = (form) => {
    return (dispatch) => {
        dispatch({
            type: "ADD_EXPERIENCE",
            payload: form
        })
    }
}
export const editExperience = (form) => {
    return (dispatch) => {
        dispatch({
            type: "EDIT_EXPERIENCE",
            payload: form
        })
    }
}

export const removeExperience = (index) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_EXPERIENCE",
            payload: index
        })
    }
}

export const addEducation = (form) => {
    return (dispatch) => {
        dispatch({
            type: "ADD_EDUCATION",
            payload: form
        })
    }
}
export const editEducation = (form) => {
    return (dispatch) => {
        dispatch({
            type: "EDIT_EDUCATION",
            payload: form
        })
    }
}

export const removeEducation = (index) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_EDUCATION",
            payload: index
        })
    }
}

export const addGeneralInfo = (form) => {
    return (dispatch) => {
        dispatch({
            type: "ADD_GENERALINFO",
            payload: form
        })
    }
}
export const editGeneralInfo = (form) => {
    return (dispatch) => {
        dispatch({
            type: "EDIT_GENERALINFO",
            payload: form
        })
    }
}

export const removeGeneralInfo = (index) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_GENERALINFO",
            payload: index
        })
    }
}

export const addFamilyInfo = (form) => {
    return (dispatch) => {
        dispatch({
            type: "ADD_FAMILYINFO",
            payload: form
        })
    }
}
export const editFamilyInfo = (form) => {
    return (dispatch) => {
        dispatch({
            type: "EDIT_FAMILYINFO",
            payload: form
        })
    }
}

export const removeFamilyInfo = (index) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_FAMILYINFO",
            payload: index
        })
    }
}