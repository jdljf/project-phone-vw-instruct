// 递归后台返回的多层数据，
function handleNav(arr,newArr) {
    arr.map((item, index) => {
        if (item.children.length > 0) {
            handleNav(item.children, newArr);
        } else {
            newArr.push({
                name:item.name,
            });
            return;
        }
    });
};
export default handleNav;