import  { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import { get_categorys, query_doctors } from '../../store/reducers/homeReducer';
import Doctor from './Doctor';
import SEO from '../SEO/SEO';
import { debounce } from 'lodash';

const DoctorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { doctors, totalDoctor, categorys, parPage, isLoading } = useSelector(state => state.home);
  const [filterOpen, setFilterOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  console.log(doctors)
  // Smooth scroll on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Load categories on mount
  useEffect(() => {
    dispatch(get_categorys());
  }, [dispatch]);

  // Parse URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get('category') || '';
    const page = parseInt(queryParams.get('page'), 10) || 1;

    setCategory(selectedCategory);
    setPageNumber(page);

    dispatch(query_doctors({ category: selectedCategory, pageNumber: page }));
  }, [location.search, dispatch]);

  // Bengali number formatter (memoized)
  const toBengaliNumber = useCallback((number) => {
  if (number === null || number === undefined) return "০";
  return number.toString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
}, []);


  // Debounced navigate function to avoid rapid API calls on filter/page changes
  const debouncedNavigate = useMemo(() =>
    debounce((url) => {
      navigate(url);
    }, 300)
  , [navigate]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedNavigate.cancel();
    };
  }, [debouncedNavigate]);

  // Category filter toggle handler
  const handleCategoryChange = useCallback((e, value) => {
    const isChecked = e.target.checked;
    const url = isChecked
      ? `/our-doctors?category=${encodeURIComponent(value)}&page=1`
      : '/our-doctors';

    debouncedNavigate(url);
  }, [debouncedNavigate]);

  // Pagination handler
  const handlePageChange = useCallback((newPage) => {
    const queryParams = new URLSearchParams(location.search);
    const currentCategory = queryParams.get('category');
    const url = currentCategory
      ? `/our-doctors?category=${encodeURIComponent(currentCategory)}&page=${newPage}`
      : `/our-doctors?page=${newPage}`;

    debouncedNavigate(url);
  }, [debouncedNavigate, location.search]);

  const siteUrl = 'https://medifasthealthcare.com' + location.pathname + location.search;
  const seoTitle = category
    ? `${category} স্পেশালিস্ট ডাক্তার | মোট ${toBengaliNumber(totalDoctor)} জন`
    : `সেরা ডাক্তার লিস্ট | মোট ${toBengaliNumber(totalDoctor)} জন | আমাদের ডাক্তার`;

  const seoDescription = category
    ? `আপনি এখন ${category} ক্যাটেগরির ${toBengaliNumber(totalDoctor)} জন অভিজ্ঞ ডাক্তার দেখতে পাচ্ছেন। এখনই সঠিক ডাক্তার খুঁজুন।`
    : `আমাদের ওয়েবসাইটে ${toBengaliNumber(totalDoctor)} জন অভিজ্ঞ ডাক্তার তালিকাভুক্ত আছেন। ক্যাটেগরি অনুযায়ী খুঁজুন এবং প্রয়োজনে অ্যাপয়েন্টমেন্ট নিন।`;

  const seoKeywords = category
    ? `${category}, ${category} ডাক্তার, ${category} specialist doctor, doctor list`
    : `doctor list, best doctors, specialist doctor, appointment, doctor category`;

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        url={siteUrl}
      />

      <div className="max-w-7xl mx-auto px-4 mt-4 mb-6">
        <div className="md:block lg:hidden mb-4">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md"
          >
            {filterOpen ? "ফিল্টার লুকাও" : "ডাক্তার ফিল্টার করো"}
          </button>
        </div>

        <div className="flex flex-wrap">
          {/* Sidebar Filter */}
          <aside className={`w-full lg:w-1/4 transition-all duration-300 ${filterOpen ? "block" : "hidden"} lg:block`}>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-700">স্পেশালিস্ট ক্যাটেগরি</h2>
              <div className="space-y-2">
                {categorys?.map(({ _id, name }) => (
                  <div key={_id} className="flex items-center gap-2 py-1">
                    <input
                      id={name}
                      type="checkbox"
                      checked={category === name}
                      onChange={(e) => handleCategoryChange(e, name)}
                      className="cursor-pointer"
                    />
                    <label htmlFor={name} className="text-slate-600 cursor-pointer">{name}</label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Doctor List */}
          <main className="w-full lg:w-3/4 lg:pl-6">
            <div className="p-4 bg-white shadow-md rounded-lg mb-4">
              <h2 className="text-lg font-medium text-gray-700">
                মোট ডাক্তার: {toBengaliNumber(totalDoctor)} জন
              </h2>
            </div>

            {isLoading ? (
              <div className="text-center py-10 text-gray-600">লোড হচ্ছে...</div>
            ) : doctors?.length === 0 ? (
              <div className="bg-red-100 text-red-600 p-4 rounded-md shadow text-center">
                {category
                  ? `"${category}" ক্যাটেগরির অধীনে কোনো ডাক্তার পাওয়া যায়নি।`
                  : "এই মুহূর্তে কোনো ডাক্তার পাওয়া যাচ্ছে না।"}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors?.map((doctor) => (
                  <Doctor doctor={doctor} key={doctor._id} />
                ))}
              </div>
            )}

            {totalDoctor > parPage && doctors?.length > 0 && (
              <div className="mt-6">
                <Pagination
                  pageNumber={pageNumber}
                  setPageNumber={handlePageChange}
                  totalItem={totalDoctor}
                  parPage={parPage}
                  showItem={Math.ceil(totalDoctor / parPage)}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default DoctorPage;
