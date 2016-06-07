/**
 * Created by Administrator on 07/06/2016.
 */
(function(){
    var app = angular.module('movieApp');
    app.directive('dynFbCommentBox', function () {
        function createHTML(href, numposts, colorscheme) {
            return '<div data-width="100%" class="fb-comments" ' +
                'data-href="' + href + '" ' +
                'data-numposts="' + numposts + '" ' +
                'data-colorscheme="' + colorscheme + '">' +
                '</div>';
        }

        return {
            restrict: 'A',
            scope: {},
            link: function postLink(scope, elem, attrs) {
                attrs.$observe('pageHref', function (newValue) {
                    var href        = newValue;
                    var numposts    = attrs.numposts    || 5;
                    var colorscheme = attrs.colorscheme || 'dark';
                    elem.html(createHTML(href, numposts, colorscheme));
                    FB.XFBML.parse(elem[0]);
                });
            }
        };
    });
}());