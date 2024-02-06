'use client'
import Link from 'next/link';

function SubNav() {
  const categories = [
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'content-writing', label: 'Content Writing' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'video-editing', label: 'Video Editing' },
    { value: 'music-production', label: 'Music Production' },
    { value: 'translation', label: 'Translation' },
  ];

  return (
    <div className='w-full border-y-2 flex font-semibold sm:text-sm md:text-sm lg:text-sm xl:text-sm justify-center text-gray-600 items-center h-12 bg-white'>
      <ul className='flex w-full justify-evenly'>
        {categories.map((category) => (
          <li
            key={category.value}
            className='px-2 whitespace-nowrap'
          >
            <Link href={`/${category.value}`}>
              {category.label.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubNav;
