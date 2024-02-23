import React, { useEffect, useState } from "react";
import { BiTimeFive } from 'react-icons/bi';
import { fetchJobList } from "../../apis/api";
import moment from 'moment';
import DOMPurify from 'dompurify';
import './jobs.css'


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


    // Filter jobs based on searchParams
    const filteredJobs = jobs.filter((job) => {
        return (
            (!searchParams.clock || job.title.toLowerCase().includes(searchParams.clock.toLowerCase())) &&
            (!searchParams.location || (job.locations && job.locations.some(location => location.name.toLowerCase().includes(searchParams.location.toLowerCase())))) &&
            (!searchParams.type || (job.types && job.types.some(type => type.name.toLowerCase().includes(searchParams.type.toLowerCase())))) &&
            (!searchParams.contract || (job.contracts && job.contracts.some(contract => contract.name.toLowerCase().includes(searchParams.contract.toLowerCase()))))
        );
    });

    // Get current jobs
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);


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


    const [selectedJobId, setSelectedJobId] = useState(null);

    const openModal = (jobId) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSelectedJobId(jobId);
    };

    const closeModal = () => {
        setSelectedJobId(null);
    };



    const Modal = ({ isOpen, onClose, job }) => {
        const createMarkup = (html) => {
            const sanitizedHTML = DOMPurify.sanitize(html);
            return { __html: sanitizedHTML };
        };

        return (
            <div className={`modal ${isOpen ? 'block' : 'hidden'} flex items-center justify-center z-50`}>
                <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
                <div className="modal-content bg-white rounded-lg shadow-lg absolute left-1/2 top-full transform -translate-x-1/2 -translate-y-full mt-9 w-auto p-4 overflow-y-auto max-h-screen">
                    <div className="sticky top-0 bg-white py-6 mb-4 z-10">
                        <div className="flex justify-between divide-full mx-4">
                            <h2 className="text-xl font-semibold">Job Title - {job.title}</h2>
                            <div>
                                <button className="btn-close px-4 py-2 bg-red-500 text-white rounded-lg" onClick={onClose}>
                                    x
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-800 modal-scrollbar" dangerouslySetInnerHTML={createMarkup(job.body)} />
                    <div className="flex justify-center">
                        <button className="btn-close px-10 py-4 bg-[#915EFF] text-white rounded-lg" onClick={() => window.location.href = job?.company?.url_linkedin}>
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        );
    };





    return (
        <div>
            {loading ? (
                <div className="flex items-center animate-bounce justify-center h-screen">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-[#915EFF] h-16 w-16"></div>
                </div>
            ) : (
                <div>
                    {
                        currentJobs.length > 0 ? (
                            <div>
                                {/*     <div className="flex justify-start mt-8">
                                    <p className="text-pretty text-3xl  font-medium">Welcome to the Search Platform for Developers</p>
                                </div> */}

                                <div className="jobContainer flex gap-10 justify-center flex-wrap items-center py-10" >
                                    {currentJobs.map((job) => (
                                        <div key={job.id} className="group group/item singleJob relative w-[290px] h-[350px] p-[20px] bg-white rounded-[10px] hover:bg-[#915EFF] shadow-lg shadow-greyIsh-400/700 hover:shadow-lg">
                                            <span className="flex justify-between items-center gap-4">
                                                <h1 className="text-[90%] font-semibold text-textcolor group-hover:text-white max-w-[200px] overflow-hidden overflow-ellipsis max-h-[3em] line-clamp-2 pb-10">
                                                    {job.title}
                                                </h1>
                                                <div className="relative py-4">
                                                    <div className="flex  items-center text-[#ccc] -right-4   gap-1">
                                                        <BiTimeFive />
                                                        <p className="w-[100px]">{moment(job.publishedAt).fromNow()}</p>
                                                    </div>
                                                </div>

                                            </span>
                                            <h6 className="text-[#ccc] mt-2">
                                                {job.locations?.slice(0, 1)?.map((location) => (
                                                    <span key={location.id}>{location && location.name && (
                                                        <span>{location.name}</span>
                                                    )}
                                                        {(!location || !location.name) && <span>location</span>}</span>
                                                ))}<span>({job.types?.map((type) => (
                                                    <span>{type.name}</span>
                                                ))})</span>
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
                                            <button
                                                onClick={() => openModal(job.id)}
                                                className="jobButton border-[2px] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold text-textcolor group-hover/item:text-textcolor group-hover:text-white hover:bg-white"
                                            >
                                               More Details...
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {selectedJobId && (
                                    <Modal isOpen={true} onClose={closeModal} job={jobs.find((job) => job.id === selectedJobId)} />
                                )}
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

                        ) :
                            (
                                <div className="flex items-center justify-center h-screen text-[#915EFF]">
                                    <div className="font-extrabold">
                                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png?f=webp" alt="" />
                                        <p className="text-center">OUP.... Job Not Found</p>
                                    </div>
                                </div>
                            )
                    }

                </div>
            )}
        </div>
    );
};

export default Jobs;




