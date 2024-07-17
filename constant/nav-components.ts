export const aboutComponents: { title: string; href: string; }[] = [
    {
      title: "हाम्रो परिचय",
      href: "/docs/primitives/alert-dialog",
    
    },
    {
      title: "हाम्रा समितिहरु",
      href: "/docs/primitives/hover-card",
     
    },
    {
      title: "अध्यक्षबाट सन्देश",
      href: "/docs/primitives/progress",
    },
    
  ]


  export const useFulLinks = [
    { name: "गृह", href: "/" },
    { name: "हाम्रो बारेमा", href: "/about" },
    { name: "सञ्चालक समिति", href: "/about/teams" },
    { name: "अध्यक्षबाट सन्देश", href: "/message/chairman-message" },

]

export const otherLinks = [
    { name: "सम्पर्क", href: "/contact" },
    { name: "सुचना", href: "/notice" },
    { name: "ग्यालरी", href: "/gallery" },
]

const navigation = [
    { name: "मुख्य पृष्ठ", href: "/", current: true, type: "link" },
    {
        name: "हाम्रो बारेमा",
        type: "dropdown",
        current: false,
        dropdown: [
          { name: "परिचय", href: "/about/" },
          { name: "सञ्चालक समिति", href: "/about/teams" },
          { name: "व्यवस्थापन", href: "/about/management" },
          { name: "अध्यक्षबाट सन्देश", href: "/about/अध्यक्षबाट सन्देश" },
        ],
      },
    {
      name: "हाम्रा सेवाहरु",
      type: "dropdown",
      current: false,
      dropdown: [
        { name: "बचत सेवा", href: "/services/saving" },
        { name: "ऋण सेवा", href: "/services/loan" },
        { name: "बिमा सेवा", href: "/services/insurance" },
        { name: "अन्य सेवाहरू", href: "/services/others" },
      ],
    },
    
    { name: "सन्देश", href: "#",
      current: false, 
      type: "dropdown",
      dropdown: [
        { name: "अध्यक्षबाट सन्देश", href: "/message/अध्यक्षबाट सन्देश" },
      ], 
    },
    { name: "सुचना", href: "/message", current: false, type: "link" },
    { name: "ग्यालरी", href: "/message", current: false, type: "link" },
    { name: "सम्पर्क", href: "/contact", current: false, type: "link" },
  ];