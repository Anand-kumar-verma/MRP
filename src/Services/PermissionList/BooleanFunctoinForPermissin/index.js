

export const isPermission = (Permission,value)=>{
    console.log(value)
console.log(Permission?.find((i) => i?.name === value)?.active_status === true)
    if(Permission?.find((i) => i?.name === value)?.active_status === true) {
        return true
    }       
    else{
        return false
    }
    
    
}