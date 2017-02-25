'use strict';

app.controller('AskCtrl', ($scope, $state, $http, ToastFactory, $translate) => {

    $scope.postQuestion = () => {
        return $http.post('/forum', {
            title: $scope.title,
            content: $scope.content,
            category: $scope.category        
        })
        .then((res) => res.data)
        .then((data) => {
            if (data.success) {
                $scope.title = null;
                $scope.content = null;
                $scope.askForm.$setPristine();
                $scope.askForm.$setUntouched();
                ToastFactory.displayMsg($translate.instant('T_POST_SUCCESS'), 500);
                // Go to messages state
                $state.go('forum');
            } else {
                ToastFactory.displayMsg($translate.instant('T_POST_FAIL'), 500);
            }
        })      
    }

    $scope.goToForum = () => {
        $state.go('forum');
    }


    $scope.categories = [
        {
            translated: $translate.instant('ASK_CAT_SALARY'),
            value: 'Salary'
        },
        {
            translated: $translate.instant('ASK_CAT_HEALTH'),
            value: 'Health',
        },
        {
            translated: $translate.instant('ASK_CAT_PRIVACY'),
            value: 'Privacy',
        },
        {
            translated: $translate.instant('ASK_CAT_WORK'),
            value: 'Work',
        },
        {
            translated: $translate.instant('ASK_CAT_LEAVE'),
            value: 'Leave',
        },
        {
            translated: $translate.instant('ASK_CAT_OTHERS'),
            value: 'Others'
        }
    ];
});
