import type { ReactText } from 'react';
import React, { useState } from 'react';
import { Button, Popconfirm, message, Tag, Space } from 'antd';
import ProList from '@ant-design/pro-list';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

type reserveRowType = {
    is_cancel: Number,
    title: string, reservation_id: string, room_id: string, table: string, start_time: string, end_time: string, sign_in_status: Number
}
export default () => {
    const { reserveList } = useSelector<
        GlobalState,
        GlobalState["reserve"]
    >((state) => state.reserve);
    const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);
    const dispatch = useDispatch<EffectsDispatch>();

    const setSignInTag = (row: reserveRowType) => {
        if (moment(row.start_time).diff(moment()) > 0) {
            if (moment(row.start_time).diff(moment().add(10, 'minutes')) < 0) {
                if (row.sign_in_status === 1) {
                    return (
                        <Tag color="green">
                            Wait Study
                        </Tag>
                    )
                } else {
                    return (
                        <Tag color="orange">
                            Sign In
                        </Tag>
                    )
                }

            } else {
                return (<Tag color="blue">
                    Wait Sign In
                </Tag>)
            }


        } else if (moment(row.end_time).diff(moment()) > 0 && row.sign_in_status === 1) {
            if (row.is_cancel === 0) {
                return (
                    <Tag color="#5BD8A6">
                        Studying
                    </Tag>
                )
            } else {
                return (
                    <Tag color="red">
                        Cancel
                    </Tag>
                )
            }


        } else {
            return (
                <Tag color="grey">
                    Reserved
                </Tag>
            )
        }
    }

    const setReserveButton = (row: reserveRowType) => {

        if (moment(row.start_time).diff(moment()) > 0) {
            if (moment(row.start_time).diff(moment().add(10, 'minutes')) < 0) {
                if (row.sign_in_status === 1) {
                    return (
                        <Button disabled type='text'>
                            Wait Study
                        </Button>
                    )
                } else {
                    return (
                        <Button onClick={() => {
                            dispatch({
                                type: 'reserve/postReservationByStudent',
                                payload: {
                                    id: row.reservation_id,
                                    method: 'signIn'
                                }
                            }).then((res: any) => {
                                const { state } = res
                                if (state) {
                                    message.success('Sign In Success')
                                    dispatch({
                                        type: "reserve/fetReservationByStudent",
                                    });
                                }

                            })

                        }} type='text'>
                            Sign In
                        </Button>
                    )
                }

            } else {
                return (<Button disabled type='text'>
                    Sign In
                </Button>
                )
            }


        } else if (moment(row.end_time).diff(moment()) > 0 && row.sign_in_status === 1) {
            if (row.is_cancel === 0) {
                return (
                    <Popconfirm
                        title="Are you sure to cancel this reservation?"
                        onConfirm={() => {
                            dispatch({
                                type: 'reserve/postReservationByStudent',
                                payload: {
                                    id: row.reservation_id,
                                    method: 'cancel'
                                }
                            }).then((res: any) => {
                                const { state } = res
                                if (state) {
                                    message.success('Cancel Success')
                                    dispatch({
                                        type: "reserve/fetReservationByStudent",
                                    });
                                }

                            })
                        }}
                        onCancel={() => {
                            message.error('Cancel Cancel');
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='text' style={{ color: 'gray' }}
                        >
                            Cancel
                        </Button>
                    </Popconfirm>
                )
            }
            else {
                return (
                    <Popconfirm
                        title="Are you sure to delete this reservation?"
                        onConfirm={() => {
                            dispatch({
                                type: 'reserve/postReservationByStudent',
                                payload: {
                                    id: row.reservation_id,
                                    method: 'delete'
                                }
                            }).then((res: any) => {
                                const { state } = res
                                if (state) {
                                    message.success('Delete Success')
                                    dispatch({
                                        type: "reserve/fetReservationByStudent",
                                    });
                                }

                            })
                        }}
                        onCancel={() => {
                            message.error('Cancel Delete');
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button onClick={() => {

                        }} type='text' style={{ color: 'red' }}>
                            Delete
                        </Button>
                    </Popconfirm>
                )
            }
            // else{
            //     return (
            //         <Popconfirm
            //         title="Are you sure to Recover this reservation?"
            //         onConfirm={() => {
            //             dispatch({
            //                 type: 'reserve/postReservationByStudent',
            //                 payload: {
            //                     id: row.reservation_id,
            //                     method: 'recover'
            //                 }
            //             }).then((res: any) => {
            //                 const { state } = res
            //                 if (state) {
            //                     message.success('Recover Success')
            //                     dispatch({
            //                         type: "reserve/fetReservationByStudent",
            //                     });
            //                 }

            //             })
            //         }}
            //         onCancel={() => {
            //             message.error('Cancel Recover');
            //         }}
            //         okText="Yes"
            //         cancelText="No"
            //     >
            //         <Button type='text' style={{color:'gray'}} 
            //         >
            //             Recover
            //         </Button>
            //         </Popconfirm>
            //     )
            // }


        } else {
            return (<Popconfirm
                title="Are you sure to delete this reservation?"
                onConfirm={() => {
                    dispatch({
                        type: 'reserve/postReservationByStudent',
                        payload: {
                            id: row.reservation_id,
                            method: 'delete'
                        }
                    }).then((res: any) => {
                        const { state } = res
                        if (state) {
                            message.success('Delete Success')
                            dispatch({
                                type: "reserve/fetReservationByStudent",
                            });
                        }

                    })
                }}
                onCancel={() => {
                    message.error('Cancel Delete');
                }}
                okText="Yes"
                cancelText="No"
            >
                <Button onClick={() => {

                }} type='text' style={{ color: 'red' }}>
                    Delete
                </Button>
            </Popconfirm>)
        }
    }
    return (
        <ProList<reserveRowType>
            rowKey="reservation_id"
            expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
            dataSource={reserveList}
            metas={{
                title: {},
                subTitle: {
                    render: (_, row) => {
                        return (
                            <Space size={0}>
                                <Tag color="blue">R{row.room_id}T{row.table}</Tag>
                                {setSignInTag(row)}
                            </Space>
                        );
                    },
                },
                description: {
                    render: (_, row) => {
                        return (
                            <>
                                <p>
                                    You have reserved building <b>{row.title}</b> room <b>{row.room_id}</b>
                                    {" "}table <b>
                                        {row.table}
                                    </b>
                                </p>
                                <p style={{ fontWeight: 'bolder' }}>startTime:{moment(row.start_time).format('YYYY-MM-DD HH:mm:ss')}</p>
                                <p style={{ fontWeight: 'bolder' }}>endTime:{moment(row.end_time).format('YYYY-MM-DD HH:mm:ss')}</p>
                            </>
                        );
                    },
                },
                avatar: {},
                content: {
                },
                actions: {
                    render: (_, row) => {
                        return (
                            <Space size='middle'>
                                {setReserveButton(row)
                                }

                            </Space>
                        )
                    },
                },
            }}
        />
    );
};