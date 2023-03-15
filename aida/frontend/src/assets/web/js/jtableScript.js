$(document).ready(function() {
	$('#programsTableContainer').jtable({
		title : 'Lista programmi',
		actions : {
			listAction : 'listAction',
			createAction : 'createAction',
			updateAction : 'updateAction',
			deleteAction : 'deleteAction'
		},

		fields : {
			id : {
				title : 'Id program',
				width : '5%',
				key : true,
				//list : false,
				edit : false
			},
			name : {
				title : 'Name',
                type: 'textarea',
				width : '15%',
				edit : true
			},
			code: {
				title : 'Code',
				width : '15%',
                type: 'textarea',
				edit : true
			},
			help: {
				title : 'Help',
				width : '65%',
                type: 'textarea',
				edit : true
			}
		}
	});
	$('#programsTableContainer').jtable('load');
});