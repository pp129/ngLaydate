# ngLaydate

> angularjs layui.laydate directive

* [layui](http:///www.layui.com/doc/modules/laydate.html#value)
* [layDate](http://www.layui.com/laydate/)

## 使用

```html
    <!--默认-->
    <input ng-lay-date type="text" ng-model="date" />
    <!--时间范围+格式化-->
    <input ng-lay-date type="text" ng-model="date1" range="~" format="yyyy-MM-dd HH:mm:ss" />
    <!--格式化 年-月-->
    <input ng-lay-date type="text" ng-model="date2" format="yyyy-MM" />
    <!--时间-->
    <input ng-lay-date type="text" ng-model="date3" range="~" format="HH:mm:ss" />
    <!--时间范围+格式化+双向绑定-->
    <input ng-lay-date type="text" ng-model="myDate.value" range="{{myDate.range}}" format="{{myDate.format}}">
    <button ng-click="setRange()">2013-01-29 13:14:11 ~ 2018-04-17 10:51:00</button>

    <script src="angular.js"></script>
    <script src="jquery.min.js"></script>
    <script src="laydate/laydate.js"></script>
    <script src="ngLayDate.js"></script>
    <script>
        var app = angular.module('app', ['ngLayDate']);
        app.controller('ctrl', function ($scope) {
            $scope.myDate = {
                value: {
                    "startDate": "2018-04-03 00:00:00",
                    "endDate": "2018-04-19 00:00:00"
                },
                format: 'yyyy-MM-dd HH:mm:ss'
            };
            $scope.setRange = function () {
                $scope.myDate = {
                    value: {
                        "startDate": "2013-01-29 13:14:11",
                        "endDate": "2018-04-17 10:51:00"
                    },
                    format: 'yyyy-MM-dd HH:mm:ss'
                };
            }
        })
    </script>
```
