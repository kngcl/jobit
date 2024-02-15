import React, { useEffect, useState } from "react";
import { BiTimeFive } from 'react-icons/bi';
import { fetchJobList } from "../../apis/api";
import moment from 'moment';


const Jobs = ({ searchParams }) => {
    const [jobs, setJob] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(6);
    const [loading, setLoader] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoader(true);
                const joblist = await fetchJobList();
                console.log(joblist.results);
                setJob(joblist.results);
                setLoader(false);
            } catch (error) {
                console.error('error fetching job list', error);
                setLoader(false);
            }
        };
        fetchData();
    }, []);

    function truncateString(str, limit = 100) {
        if (str && str.length > limit) {
            return str.substring(0, limit) + "...";
        } else {
            return str;
        }
    }

    //truncasteString
    /*     function truncateString16(str, limit =30) {
            if (str && str.length > limit) {
                return str.substring(0, limit)
            } else {
                return str;
            }
        } */

    //translate text 
    const translateText = async (text) => {
        try {
            const translation = await translate(text, { from: 'auto', to: 'en' });
            return translation.text;
        } catch (error) {
            console.error('error translating text', error);
            return text; // Return original text in case of an error
        }
    };


    // Filter jobs based on searchParams
    const filteredJobs = jobs.filter((job) => {
        return (
            (!searchParams.clock || job.title.toLowerCase().includes(searchParams.clock.toLowerCase())) &&
            (!searchParams.house || job.title.toLowerCase().includes(searchParams.house.toLowerCase())) &&
            (!searchParams.location || (job.locations && job.locations.some(location => location.name.toLowerCase().includes(searchParams.location.toLowerCase()))))
        );
    });

    // Get current jobs
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    // Change page
    /* const paginate = (pageNumber) => setCurrentPage(pageNumber); */

    // Previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Next page
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredJobs.length / jobsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };



    return (
        <div>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="loader ease-linear border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                </div>
            ) : (
                <div>
                    <div className="jobContainer flex gap-10 justify-center flex-wrap items-center py-10" >
                        {currentJobs.map((job) => (
                            <div key={job.id} className="group group/item singleJob relative w-[290px] h-[400px] p-[20px] bg-white rounded-[10px] hover:bg-[#915EFF] shadow-lg shadow-greyIsh-400/700 hover:shadow-lg">
                                <span className="flex justify-between items-center gap-4">
                                    <h1 className="text-[90%] font-semibold text-textcolor group-hover:text-white max-w-[200px] overflow-hidden overflow-ellipsis max-h-[3em] line-clamp-2 pb-10">
                                        {job.title}
                                    </h1>
                                    <div className="relative">
                                        <div className="flex absolute items-center text-[#ccc] -right-4  py-7 gap-1">
                                            <BiTimeFive />
                                            <p className="w-[100px]">{moment(job.publishedAt).fromNow()}</p>
                                        </div>
                                    </div>

                                </span>
                                <h6 className="text-[#ccc] mt-2">
                                    {job.locations?.slice(0, 1)?.map((location) => (
                                        <span key={location.id}>{location.name}</span>
                                    ))}
                                </h6>
                                <p className="text-[13px] text-[#959595] pt-4 border-t-[2px] mt-4 group-hover:text-white max-h-[80px] overflow-hidden">
                                    {truncateString(/* translateText */(job.company.description))}
                                </p>
                                <div className="company flex items-center gap-2 mt-4">
                                    <img src={job.company.logo} alt="company Logo" className="w-[10%]" />
                                    <span className="text-[14px] py-[1rem] block group-hover:text-white">
                                        {job.company.slug.substring(0, 25) + (job.company.slug.length > 25 ? '...' : '')}
                                    </span>
                                </div>
                                <div className="absolute bottom-10 mt-4">
                                    <button className="jobButton border-[2px] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold text-textcolor group-hover/item:text-textcolor group-hover:text-white hover:bg-white">
                                        <a href={job.company.url_linkedin} target="_blank" rel="noopener noreferrer">Apply Now</a>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pagination-container flex justify-center mt-4 mb-10 space-x-4">
                        <button onClick={prevPage} className="pagination-button prev-button border-[2px] rounded-[5px]  p-[10px]  text-[14px] font-semibold text-textcolor hover:bg-blue-900 hover:text-white cursor-pointer" disabled={currentPage === 1}>
                            Previous
                        </button>
                        <div className="flex justify-center mt-4">
                            <p className="text-slate-900 text-sm ">
                                {currentPage} / {Math.ceil(filteredJobs.length / jobsPerPage)}
                            </p>
                        </div>
                        <button onClick={nextPage} className="pagination-button next-button border-[2px] rounded-[5px]  p-[10px]  text-[14px] font-semibold text-textcolor  hover:bg-blue-900 hover:text-white cursor-pointer" disabled={currentPage === Math.ceil(filteredJobs.length / jobsPerPage)}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;
