export function ValidateList(list, exclusionList) {
    for (var i = 0; i < list.length; i++) {
        if(exclusionList.includes(list[i])){
            return false;
        }
    }
    return true;
}

export const stringCompare = (pass1, pass2) => {
   let message  = ""
    if (pass1 !== pass2) {
     message   = "Passwords do not match"
    }
    else if (pass1.length <= 3) {
      message = "Passwords is not long enough"
    }
    return message
};