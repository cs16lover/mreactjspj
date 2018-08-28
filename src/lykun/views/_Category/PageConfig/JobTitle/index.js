const Config = {
    Page:{
        apiPath: 'JobTitle',
        screenCode: 'SC_JobTitle',
        title: 'Job Title',
        detailPath: '/job-title/[Id]',
    },
    Header:{
        show: false,
    },
    AddNew:{
        data:[
            { name: 'JobTitleName', label: 'Name', type: 'text', required: true, msgInvalid: 'Required Name', },
            { name: 'JobTitleDescription', label: 'Description', type: 'textarea', },
        ]
    },
    Table:{},
}

export default Config;