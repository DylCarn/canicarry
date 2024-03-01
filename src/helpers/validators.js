export function ValidateList(list, exclusionList) {
    for (var i = 0; i < list.length; i++) {
        if(exclusionList.includes(list[i])){
            return false;
        }
    }
    return true;
}