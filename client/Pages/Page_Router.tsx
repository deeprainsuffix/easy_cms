import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { page_Error404, page_Index, page_Preview } from './page_urls';
import { PageIndex } from './Index'; // 考虑懒加载 todo
import { PagePreview } from './Preview';
import { PageError404 } from './Error404';

const router = createBrowserRouter([
    {
        path: page_Index,
        element: <PageIndex />,
        errorElement: <PageError404 />,
    },
]);

export function Page_Router() {
    return (
        <RouterProvider router={router} />
    )
}