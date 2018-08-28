const Config = {
    Page:{
        apiPath: 'Department',
        screenCode: 'SC_Department',
        title: 'Department',
        detailPath: '/department/[Id]',
    },
    Header:{
        show: false,
    },
    AddNew:{
        data:[
            { name: 'Name', label: 'Name', type: 'text', required: true, msgInvalid: 'Required Name', },
            { name: 'NotifyEmails', label: 'Notify Emails', type: 'text', required: true, msgInvalid: 'Required Name', },
            { name: 'Description', label: 'Description', type: 'textarea', },
        ]
    },
    Table:{},
}

export default Config;