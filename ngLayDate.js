if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
	module.exports = 'ngLayDate';
}
angular.module('ngLayDate', [])
	.directive('ngLayDate', function ($timeout) {
		return {
			require: '?ngModel',
			restrict: 'A',
			scope: {
				ngModel: '='
			},
			link: function (scope, element, attr, ngModel) {
				var _date = null,
					_config = {};
				// 渲染模板完成后执行
				$timeout(function () {
					// 初始化参数
					//console.log(ngModel.$modelValue);
					_config = {
						elem: element[0],
						value: ngModel.$modelValue && ngModel.$modelValue.startDate && ngModel.$modelValue.endDate ? ngModel.$modelValue.startDate + ' ' + (attr.range !== undefined && attr.range !== '' ? attr.range : '~') + ' ' + ngModel.$modelValue.endDate : ngModel.$modelValue ? ngModel.$modelValue : '',
						format: attr.format !== undefined && attr.format !== '' ? attr.format : 'yyyy-MM-dd',
						range: attr.range !== undefined && attr.range !== '' ? attr.range : false,
						type: attr.format !== undefined && attr.format !== '' && attr.format === 'yyyy-MM-dd HH:mm:ss' ? 'datetime' : attr.format === 'yyyy' ? 'year' : attr.format === 'yyyy-MM' ? 'month' : attr.format === 'HH:mm:ss' ? 'time' : 'date',
						//theme: '#5db2ff',
						//max:attr.hasOwnProperty('maxDate')?attr.maxDate:'',
						//min:attr.hasOwnProperty('minDate')?attr.minDate:'',
						done: function (value, date, endDate) {
							//console.log(value); //得到日期生成的值，如：2017-08-18
							//console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
							//console.log(this.range);
							var i = 0;
							if (this.range) {
								i = value.indexOf(this.range);
								ngModel.$setViewValue({
									startDate: value.substring(0, i).trim(),
									endDate: value.substring(i + 1).trim()
								});
							} else {
								ngModel.$setViewValue(value);
							}
							//console.log(value.substring(0, i).trim());
							//console.log(new Date(value.substring(0, i).trim()));
							//console.log(value.substring(i + 1).trim());
						},
						clear: function () {
							ngModel.$setViewValue(null);
						}
					};

					// 初始化
					_date = laydate.render(_config);

					// 模型值同步到视图上
					scope.$watch(function () {
						return ngModel.$modelValue;
					}, function (newValue, oldValue) {
						if (newValue) {
							if (newValue instanceof String) {
								element.val(newValue || '');
							} else if (newValue instanceof Object) {
								var value = newValue.startDate + ' ' + (attr.range !== undefined && attr.range !== '' ? attr.range : '~') + ' ' + newValue.endDate;
								element.val(value || '');
							}
						}
					}, true);


					// 监听日期最大值
					if (attr.hasOwnProperty('maxDate')) {
						attr.$observe('maxDate', function (val) {
							_config.max = val;
						})
					}
					// 监听日期最小值
					if (attr.hasOwnProperty('minDate')) {
						attr.$observe('minDate', function (val) {
							_config.min = val;
						})
					}
				}, 0);
			}
		};
	});