//영상 인기순, 최신순으로 정렬 ( 조회수 기준 )
import React, { useState } from 'react';
export const sortVideos = [
  { name: '인기순', value: 'Old' },
  { name: '최신순', value: 'recent' }
];
const [sortType, setSortType] = useState('lastest');
return (
  <div>
    <div value={sortType} onChange={setSortType} optionList={sortVideos} />
    {getProcessedVideoList().map((it) => (
      <div key={it.id}>
        {it.content}
        {it.emotion}
      </div>
    ))}
  </div>
);

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const getProcessedVideoList = () => {
  const compare = (a, b) => {
    //compare함수는, sortType이 Old라면 (뒤 날짜 - 앞 날짜)이고, oldest라면 (앞 날짜 - 뒤 날짜)를 return
    if (sortType === 'Old') {
      return parseInt(b.date) - parseInt(a.date);
    } else {
      return parseInt(a.date) - parseInt(b.date);
    }
  };
  const copyList = JSON.parse(JSON.stringify(videoList));
  const sortedList = copyList.sort(compare);
  return sortedList;
};
