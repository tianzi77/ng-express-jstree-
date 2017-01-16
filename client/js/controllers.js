(function() {
  'use strict';

  app.controller('HomeCtrl', ['$scope', 'FetchFileFactory',
    function($scope, FetchFileFactory) {
      $scope.fileViewer = 'Notice：先选择一个项目，点击左边载入源代码，点击右边演示，若是文件夹则无源代码无演示';

      $scope.tree_core = {
        
        multiple: false,  // disable multiple node selection

        check_callback: function (operation, node, node_parent, node_position, more) {
            // operation can be 'create_node', 'rename_node', 'delete_node', 'move_node' or 'copy_node'
            // in case of 'rename_node' node_position is filled with the new node name

            if (operation === 'move_node') {
                return false;   // disallow all dnd operations
            }
            return true;  // allow all other operations
        }
      };

      $scope.nodeSelected = function(e, data) {
        var _l = data.node.li_attr;

        if (_l.isLeaf) {
           var _old = data.node.id;
           var _url =  _old.replace(/E:\\hifi/,'http://cufeui.site\\hifi\\release');
            console.log(_url);
//           var url = location.href.split('/#/')[0] + '/api/resource?resource=';
//           var test = url.toString()+ awei.toString();
//           console.log(test);
            $('.btn-info').removeClass('nolink').attr('href',_url);
            
          FetchFileFactory.fetchFile(_l.base).then(function(data) {
            var _d = data.data;
            if (typeof _d == 'object') {
              //http://stackoverflow.com/a/7220510/1015046//
              _d = JSON.stringify(_d, undefined, 2);
            }
            $scope.fileViewer = _d;
          });
        } else {
            console.log(data.node.text);

            $('.btn-info').attr('href','#').addClass('nolink');
          //http://jimhoskins.com/2012/12/17/angularjs-and-apply.html//
          $scope.$apply(function() {
            $scope.fileViewer = '我是一个文件夹，请选择具体的根目录进行查看代码或演示';
          });

        }
      };
    }
  ]);

}());
