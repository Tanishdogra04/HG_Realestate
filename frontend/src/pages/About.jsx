import React from 'react';

const About = ({ onBack }) => {
    return (
        <div className="bg-white min-h-screen">
            {/* Header / Page Title Section - Kept centered but wider */}
            <div className="max-w-[1400px] mx-auto px-6 pt-12">
                <h1 className="text-3xl font-normal text-gray-800 mb-6">
                    About Us
                </h1>
                {/* Thin gray line below title */}
                <div className="border-b border-gray-100 w-full mb-12"></div>
            </div>

            {/* Main Green Container - Fixed width to match original site precisely */}
            <div className="max-w-[1190px] mx-auto px-4">
                <div className="bg-[#0d594c] text-white rounded-[25px] shadow-lg mb-12 p-[40px] md:p-[75px]">
                    {/* Content area */}
                    <div className="space-y-8 text-lg font-light leading-relaxed tracking-wide text-justify">
                        
                        <p>
                            HG Eaton Plaza, Handiaya, is a premier shopping and lifestyle
                            destination strategically located on NH-7, Barnala, Punjab.
                            Established in 2023, the plaza has been thoughtfully developed to
                            bring together shopping, dining, and entertainment experiences on a
                            grand scale, redefining how people in the region spend their leisure
                            time.
                        </p>

                        <p>
                            Sprawled across 6 acres of carefully planned space, HG Eaton combines
                            modern architecture with functionality, ensuring a seamless
                            experience for every visitor. The plaza is designed to meet the
                            expectations of today’s discerning shoppers, travelers, and families
                            — offering a perfect balance of retail, recreation, and relaxation.
                        </p>

                        <ul className="space-y-2 pt-4">
                            <li className="flex items-start">
                                <span className="mr-2">-</span>
                                <span>Started in 2023 with 120+ brands that include leading names from Luxury, Fashion, Accessories, Travel, and Food categories</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">-</span>
                                <span>Spread across 6 acres with wide walkways, open spaces, ample parking, and a vibrant retail environment</span>
                            </li>
                        </ul>

                        <div className="pt-6">
                            <h2 className="text-2xl font-normal mb-4">A World of Brands Under One Roof</h2>
                            <p>
                                HG Eaton proudly houses 120+ renowned brands, bringing together a
                                curated mix of global, national, and regional names. From luxury
                                labels that appeal to premium shoppers, to popular fashion and
                                lifestyle outlets catering to everyday style, the plaza ensures
                                variety for all age groups. Shoppers can also explore travel
                                essentials, footwear, accessories, and an extensive range of food &
                                beverage outlets, making HG Eaton a true one-stop destination.
                            </p>
                        </div>

                        <div className="pt-4">
                            <h2 className="text-2xl font-normal mb-4">Dining & Culinary Experiences</h2>
                            <p>
                                Beyond retail, HG Eaton is home to a diverse selection of cafés,
                                quick-service restaurants, and fine dining options. Whether
                                visitors are in the mood for a casual coffee, a quick snack, or a
                                full-course meal, the food zone offers something for every palate.
                                The dining areas have been designed to provide comfort and
                                ambiance, making them ideal for family outings or social
                                gatherings.
                            </p>
                        </div>

                        <div className="pt-4">
                            <h2 className="text-2xl font-normal mb-4">Entertainment & Leisure</h2>
                            <p>
                                HG Eaton is more than just shopping and dining — it is also about
                                entertainment and experiences. With dedicated zones for leisure
                                activities, gaming, and family entertainment, the plaza provides
                                engaging options for both kids and adults. This combination of
                                retail, food, and entertainment makes HG Eaton a complete
                                destination for day-long visits.
                            </p>
                        </div>

                        <div className="pt-4">
                            <h2 className="text-2xl font-normal mb-4">Accessibility & Convenience</h2>
                            <p>
                                Located on the bustling NH-7 near Zaildaar Dhaba, Village
                                Handiaya, the plaza enjoys excellent connectivity for visitors
                                traveling from Barnala, Bathinda, and other nearby cities. The
                                spacious infrastructure includes ample parking facilities,
                                well-planned navigation, and modern amenities to ensure
                                convenience, safety, and comfort for every guest.
                            </p>
                        </div>

                        <div className="pt-4 pb-12">
                            <h2 className="text-2xl font-normal mb-4">Why Choose HG Eaton?</h2>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="mr-2">-</span>
                                    <span>A premier shopping plaza launched in 2023, built to international standards</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">-</span>
                                    <span>120+ brands across multiple categories — luxury, fashion, lifestyle, travel, and food</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">-</span>
                                    <span>Spread over 6 acres, offering ample space for shopping, dining, and leisure</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">-</span>
                                    <span>Designed for families, youth, and travelers, ensuring there’s something for everyone</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-8 text-center pb-8 border-t border-white/10">
                            <p className="italic text-xl opacity-90">
                                HG Eaton Handiaya stands as a symbol of modern retail in Punjab —
                                not just a place to shop, but a destination to connect, celebrate,
                                and experience more.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;