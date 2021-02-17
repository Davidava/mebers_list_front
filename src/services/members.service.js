import request from './generic.service';

const getMember = (id) => request({ url: `member/${id}`, method: 'get' });

const getMembers = (page) => request({ url: `members/${page}`, method: 'get' });

const getMatchedMembers = (text) => request({ url: `search/${text}`, method: 'get' });

const createMember = (body) => request({ url: 'member', method: 'post', data: body });

const getMemberAndUpdate = (id, body) => request({ url: `member/${id}`, method: 'put', data: body });

const deleteMember = (id) => request({ url: `member/${id}`, method: 'delete' });

export {
  getMember, getMembers, createMember, getMemberAndUpdate, deleteMember, getMatchedMembers,
};
