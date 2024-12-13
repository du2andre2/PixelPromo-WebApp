import { PromotionProps } from "../api/promotions";
import { UserProps } from "../api/users";
import { MdFavoriteBorder } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { FaExternalLinkAlt } from "react-icons/fa";
import userDefault from '@/assets/user-default.png'

export interface PromotionCardProps {
  promotion: PromotionProps;
  user: UserProps;
}

export default function PromotionCard({ promotion, user }: PromotionCardProps) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-md shadow-md w-72">
      <img
        src={promotion.imageUrl || "https://via.placeholder.com/300"}
        alt={promotion.title}
        className="rounded-t-md w-full h-40 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400 line-through">
            R$ {promotion.originalPrice}
          </span>
          <span className="text-lg font-bold">R$ {promotion.discountedPrice}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          {"-"+promotion.discountBadge+"%" || "??%"}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-2">{promotion.title}</h2>
        <p className="text-sm text-gray-400 mb-4">{promotion.platform || "Steam"}</p>
        <div className="flex items-center gap-2">
          <img
            src={user.pictureUrl || userDefault}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <p className="text-sm">{user.name}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button className="flex items-center gap-1 text-gray-400 hover:text-white">
            <span>{promotion.platform}<FaExternalLinkAlt /></span>
          </button>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-gray-400 hover:text-white">
              <span>13<MdFavoriteBorder /></span>
            </button>
            <button className="flex items-center gap-1 text-gray-400 hover:text-white">
              <span>34<BiLike /></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
