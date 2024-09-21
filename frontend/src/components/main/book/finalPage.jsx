import React, { useEffect, useState } from "react";
import { request } from "../../../helpers/request";
import { Link, useParams, useNavigate } from "react-router-dom";
import PagePage from "./pagePage";

function CorePagePage() {
    const { permission, bookId, pageNumber } = useParams();
    const [pageData, setPageData] = useState(null);
    const [lastPage, setLastPage] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLastPage(false);
    }, []);

    async function getPage() {
        try {
            const result = await request(`/backend/${permission}/page/${bookId}/${pageNumber}`, 'GET', {}, {}, true);

            if (result.page) {
                console.log(result.page);

                let content, matrix;

                try {
                    content = JSON.parse(result.page.content);
                } catch (error) {
                    console.error('Error parsing content:', error);
                    content = null;
                }

                try {
                    matrix = JSON.parse(result.page.matrix);
                } catch (error) {
                    console.error('Error parsing matrix:', error);
                    matrix = [];
                }

                const data = {
                    title: result.page.title,
                    content: content,
                    matrix: matrix
                };

                setPageData(data);

                // Check if the current page is the last page
                if (result.page.pagesCount === result.page.pageNumber) {
                    setLastPage(true);
                } else {
                    setLastPage(false);
                }
            } else {
                throw new Error('Page not found');
            }
        } catch (error) {
            console.log('Error:', error);
            setPageData(null);
            navigate(`/page/${permission}/${bookId}/${Number(pageNumber) - 1}`);
        }
    }

    useEffect(() => {
        getPage();
    }, [permission, bookId, pageNumber]);

    return (
        <div>
            {pageData ? (
                <>
                    <PagePage title={pageData.title} matrix={pageData.matrix} content={pageData.content} />

                    <div className="full-line"></div>

                    <div className="row">
                        {Number(pageNumber) > 1 && (
                            <Link to={`/page/${permission}/${bookId}/${Number(pageNumber) - 1}`}>Previous</Link>
                        )}
                        {!lastPage && (
                            <Link to={`/page/${permission}/${bookId}/${Number(pageNumber) + 1}`}>Next</Link>
                        )}
                    </div>
                </>
            ) : (
                <h1>Page not found</h1>
            )}
        </div>
    );
}

export default React.memo(CorePagePage);