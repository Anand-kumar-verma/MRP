import React from "react";
import CustomDiv from "../../Shared/CustomDiv";
import { useState } from "react";
import SupplierInformation from "../../Components/Purchase/SupplierInformation";
import PurchaseOrderDetails from "../../Components/Purchase/PurchaseOrderDetails";
import OrderStatus from "../../Components/Purchase/OrderStatus";
import PaymentInformation from "../../Components/Purchase/PaymentInformation";
import PurhaseOrderList from "../../Components/Purchase/PurhaseOrderList";
const Purchase = () => {
  const [haderIndex, setHeaderIndex] = useState(0);

  const salesHeaderData = [
    "Supplier Information",
    "purchase Order Details",
    "Order Status",
    "Payment Information",
  ];

  return (
    <>
      <CustomDiv className=" flex flex-col gap-2 fixed w-full z-20 bg-gray-100">
        <CustomDiv className="flex">
          <div className="flex gap-5">
            {salesHeaderData.map((signleData, index) => {
              return (
                <div
                  onClick={() => setHeaderIndex(index)}
                  className={`
                                      ${
                                        index === 0 &&
                                        "bg-gradient-to-b from-[#7f7cee] to-[#2E28B0]"
                                      }
                                      ${
                                        index === 1 &&
                                        "bg-gradient-to-b from-[#89c3ec] to-[#1679AC]"
                                      }
                                      ${
                                        index === 2 &&
                                        "bg-gradient-to-b from-[#8b77dc] to-[#5038B7]"
                                      }
                                      ${
                                        index === 3 &&
                                        "bg-gradient-to-b from-[#5bc7a0] to-[#139168]"
                                      }
                                     mt-5 mb-6  text-white 
                                     px-5 py-4 flex flex-col    rounded-xl
                                      w-[20%]  items-center shadow-xl cursor-pointer relative
                                      justify-center
                                `}
                >
                  <div className="font-bold justify-center">{signleData}</div>
                  <div
                    className={`
                             ${
                               haderIndex === index &&
                               index === 0 &&
                               "bg-gradient-to-b from-[#625EF4] to-[#2E28B0]"
                             }_
                             ${
                               haderIndex === index &&
                               index === 1 &&
                               "bg-gradient-to-b from-[#75BDF1] to-[#1679AC]"
                             }
                             ${
                               haderIndex === index &&
                               index === 2 &&
                               "bg-gradient-to-b from-[#7458E0] to-[#7458E0]"
                             }
                             ${
                               haderIndex === index &&
                               index === 3 &&
                               "bg-gradient-to-b from-[#29C78D] to-[#29C78D]"
                             }
                             w-full h-[3px] absolute -bottom-3`}
                  ></div>
                </div>
              );
            })}
          </div>
        </CustomDiv>
      </CustomDiv>
      <div className=" pt-[8%] px-3 relative w-full">
        {haderIndex === 0 && <SupplierInformation />}
        {haderIndex === 1 && <PurhaseOrderList />}
        {haderIndex === 2 && <OrderStatus />}
        {haderIndex === 3 && <PaymentInformation />}
      </div>
    </>
  );
};

export default Purchase;
