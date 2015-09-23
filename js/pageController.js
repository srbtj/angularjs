var ctrls = angular.module('myApp',[]);
ctrls.controller('MyPageController',['$scope',function($scope){
    $scope.pageObj = {
        /**
         *  pageNo : 每页页码
         *  totalCount : 总页数
         *  pageSize : 每页显示的记录数
         */
        pageNo : 1,
        totalCount : 100,
        pageSize : 5
    };

    $scope.list = function(){

        console.info('this is click function');
    }
}]);

ctrls.directive('paging',function(){

    return {
        replace:true,
        restrict:'A',
        scope:{
            /** 隔离作用域   ｛｝
             *   绑定策略 ：
             *   '@' : 本地作用域属性
             *   '=' : 双向绑定
             *   '&' : 父级作用域绑定
             * */
            page:'=pageObject',
            query:'=clickFunction'
        },
        controller:function($scope,$element){
            $scope.createHtml = function(){
                var maxPage = '', // 最大页数
                    pageNo; // 当前页

                maxPage = Math.ceil($scope.page.totalCount / $scope.page.pageSize),
                pageNo = $scope.page.pageNo;

                /** 创建分页 */
                var str = '<div class="page">';

                if(maxPage > 10){

                    if(pageNo > 3){

                        str += '<a href="javascript:;"> 《 </a>';
                        str += '...';
                    }

                    for(var i = pageNo <= 2 ? 1 : pageNo - 2 ; i <= ( pageNo >= ( maxPage - 2 ) ? maxPage : ( pageNo + 2 )  ) ; i++){

                        if(i == 1){

                            if(pageNo == 1){

                                str += '<span class="disabled"> 《 </span>';
                                str += '<span class="current">' + i + '</span>';
                            }else{

                                str += '<a href="javascript:;"> 《 </a>';
                                str += '<a href="javascript:;"> ' + i + '</a>';
                            }
                        }else if( i == maxPage ){

                            if(pageNo == maxPage ){
                                str += '<span class="disabled"> 》 </span>';

                                str += '<span class="current">' + i + '</span>';
                            }else{
                                str += '<a href="javascript:;"> ' + i +' </a>';

                                str += '<a href="javascript:;"> 》 </a>';
                            }
                        } else{

                            if(pageNo == i){

                                str += '<span class="current">' + i + '</span>';
                            }else{

                                str += '<a href="javascript:;">' + i + '</a>';
                            }
                        }
                    }

                    if(pageNo < maxPage - 2){

                        str += '...';

                        str += '<a href="javascript:;"> 》 </a>';
                    }
                }

                else{

                    for(var i=1;i<=maxPage;i++){

                        if(i==1){
                            if(pageNo == 1){
                                str += '<span class="disabled"> 《 </span>';
                                str += '<span class="current"> ' + i + '</span>';
                            }else{
                                str += '<a href="javascript:;"> 《 </a>';
                                str += '<a href="javascript:;"> ' + i + '</a>';
                            }

                        }else if(i == maxPage){
                            if(pageNo == maxPage){
                                str += '<span class="current">' + i + '</span>';

                                str += '<span class="disabled"> 》 </span>';
                            }else{
                                str += '<a href="javascript:;"> ' + i + '</a>';

                                str += '<a href="javascript:;"> 》 </a>';
                            }

                        }else{
                            if(i == pageNo){
                                str += '<span class="current">'+i+'</span>';
                            }else{
                                str += '<a href="javascript:;">'+i+'</a>';
                            }

                        }
                    }
                }

                str += '<input type="number" class="page_input" min="1"><a href="javascript:;">GO</a> ';
                str += '</div>';
                $element.html(str);
                $scope.bindEvent();
            };

            $scope.bindEvent = function(){

                $element.find('a').on('click',function(){

                    var text = $(this).html();

                    var input_val = $('input').val();


                    var pageNo =  $scope.page.pageNo;

                    if($.trim(text) == $.trim('《')){
                        $scope.page.pageNo = pageNo - 1;
                    }else if($.trim(text) == $.trim('》')){
                        $scope.page.pageNo = pageNo + 1;
                    }else if($.trim(text) == 'GO'){
                        $scope.page.pageNo = parseInt($.trim(input_val)) || pageNo;
                    }else{
                        $scope.page.pageNo = parseInt(text);
                    }

                    $scope.query()
                    $scope.createHtml();
                });
            };

            $scope.createHtml();
            $scope.$watch('page.pageNo',function(){
                $scope.createHtml();
            });
        }
    };
});