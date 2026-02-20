import { CATEGORIES } from '../../constants/categories';
import type { CategoryFilter as CategoryFilterType } from '../../types';

interface CategoryFilterProps {
  selected: CategoryFilterType;
  onSelect: (category: CategoryFilterType) => void;
}

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected === cat.value
              ? 'bg-amber-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
