$('#userForm').on('submit',function () {
    let userData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: userData,
        success: function () {
            location.reload()
        },
        error: function () {
            alert('用户添加失败')
        }
    });
    return false 
})

//当用户选择文件的时候
$('#modifyBox').on('change','#avatar',function () {
    //用户选择到的文件
    //this.files[0]
    let formData = new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        //告诉$.ajax方法不要解析请求参数
        processData:false,
        //告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            // console.log(response);
            //实现头像预览功能
            $('#preview').attr('src',response[0].avatar);
            //设置隐藏域,点击请求时需要发送给服务器
            $('#hiddenAvatar').val(response[0].avatar)
        }
    });

})
//向服务器发送请求获取用户数据
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        // console.log(response)
      let html =  template('userTpl',{
            data:response
        });
        $('#userBox').html(html)
    }
});
//修改用户
$('#userBox').on('click','.edit',function () {
    let id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: `/users/${id}`,
        success: function (response) {
            // console.log(response)
            let html = template('modifyTpl',response)
            $('#modifyBox').html(html)
        }
    });
})
//为修改表单添加表单提交事件
$('#modifyBox').on('submit','#modifyForm',function () {
    let modifyData = $(this).serialize();
    let id = $(this).attr('data-id')
    // console.log(formData)
    $.ajax({
        type:'put',
        url:`/users/${id}`,
        data:modifyData,
        success: function (response) {
            location.reload()
        }

    })
    return false
})
//删除用户
$('#userBox').on('click','.delete',function () {
    if(confirm('你确定要删除吗？')) {
        let id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:`/users/${id}`,
            success:function () {
                location.reload()
            }
        })
    }
})
//全选按钮
let selectAll = $('.selectAll');
//批量删除按钮
let deleteMany = $('#deleteMany')

selectAll.on('change',function () {
    //全选按钮状态
    let status = $(this).prop('checked')

    if(status) {
        //显示批量删除按钮
        deleteMany.show()
    } else {
        //隐藏批量删除按钮
        deleteMany.hide()
    }

    //获取所有用户状态和全选按钮保持一致
    $('#userBox').find('input').prop('checked',status)
})
//当用户前面复选框发生改变时
$('#userBox').on('change','.userStatus',function () {
    //获取所有用户
    let inputs = $('#userBox').find('input')
    // 判断所有用户数量和被选中用户数量一致
    if(inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked',true)
    } else {
        selectAll.prop('checked',false)

    }

    if(inputs.filter(':checked').length > 0) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
})
//批量删除按钮点击事件
deleteMany.on('click',function () {
    let ids = [];
    //获取选中用户
    let checkedUser = $('#userBox').find('input').filter(':checked');
    //遍历选中用户获取他们的id加入数组ids中
    checkedUser.each(function (index,element) {
        ids.push($(element).attr('data-id'))
    });
    
    if(confirm('你确定要执行批量删除操作吗？')) {
        $.ajax({
            type: 'delete',
            url: `/users/${ids.join('-')}`,
            success: function () {
                location.reload()
            }
        });
    }
})