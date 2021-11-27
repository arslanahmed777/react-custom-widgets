const nodes = [
  {
    value: "dashboard",
    text: "Dashboard",
    rightsInActive: true,
    status: false,
    nodes: [
      {
        value: "ehrDashboard",
        text: "EHR Dasbhoard",
        rightsInActive: false,
        status: true,
        nodes: null,
      },
      {
        value: "dashboardOverall",
        text: "Billing Dasbhoard",
        rightsInActive: false,
        status: true,
        nodes: [
          {
            value: "dashboardAgingSummary",
            text: "Aging Summary",
            rightsInActive: true,
            status: true,
            nodes: [
              {
                value: "dashboardAppointment",
                text: "Appointment",
                rightsInActive: false,
                status: true,
                nodes: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: "download",
    text: "download",
    rightsInActive: true,
    status: false,
    nodes: null,
  },
  {
    value: "desktop",
    text: "desktop",
    rightsInActive: true,
    status: false,
    nodes: [
      {
        value: "movies",
        text: "movies",
        rightsInActive: false,
        status: false,
        nodes: [
          {
            value: "ssss",
            text: "ssss",
            rightsInActive: false,
            status: false,
            nodes: [
              {
                value: "aaasd",
                text: "aaasd",
                rightsInActive: false,
                status: false,
                nodes: null,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default nodes;
