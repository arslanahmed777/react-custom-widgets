import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as VsIcons from "react-icons/vsc";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: 'Pagination',
        path: '/pagination',
        icon: <IoIcons.IoIosPaper />,
    },
    {
        title: 'Table',
        path: '/table',
        icon: <FaIcons.FaCartPlus />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Add data',
                path: '/table/addtabledata',
                icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },
            {
                title: 'Remove data',
                path: '/table/removetabledata',
                icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },

        ]
    },
    {
        title: 'Chat',
        path: '/chat',
        icon: <FaIcons.FaRocketchat />,
    },
    {
        title: 'Blogs',
        path: '/blogs',
        icon: <FaIcons.FaEnvelopeOpenText />,
    },
    {
        title: 'Time Picker',
        path: '/timepicker',
        icon: <IoIcons.IoIosTime />,
    },
    {
        title: 'Tree View',
        path: '/treeview',
        icon: <IoIcons.IoIosGitMerge />,
    },
    {
        title: 'Checkbox tree',
        path: '/checkboxtree',
        icon: <VsIcons.VscListTree />,
    }
];