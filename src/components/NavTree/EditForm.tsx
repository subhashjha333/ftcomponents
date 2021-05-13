import React, { useState, useEffect, useRef } from 'react'
import { IconButton, overrideThemeVariables} from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'
import Icon from '@mdi/react'
import {mdiAccountPlus, mdiCloseThick} from '@mdi/js'
import { createUseStyles } from 'react-jss';
import Modal from 'react-modal';
import { Card, CardContent, CardAction, Button, TextField, Divider } from 'ui-neumorphism';
import { H6, Subtitle2} from 'ui-neumorphism';
import { cloneDeep } from 'lodash'
import * as constants from './constants'


interface EditFormProps {
    node : Node,
    getNextID : () => string;
    getNode: (id: string) => Node;
    scrollToElement: (element: HTMLElement) => void;
    setModalElementEditIsOpen: (isOpen: boolean) => void;
    updateNode: (node: Node, name : string, partner: string, childrenInfo: Map<string, string>) => void;
};

const useStyles = createUseStyles({
    modalEdit:{
    },
    modalStyle: {
        display: "flex",
        paddingTop: "10vh",
        justifyContent: "center",
        alignItems: "center",
        '&:focus': {
            outline:0
        }
    },
    modalContent : {
        maxHeight : "70vh",
        minHeight : "40vh",
        display: "flex",
        flexDirection: "column",

    },
    modalButton : {
        display: "flex",
        justifyContent: "space-between",
        padding: constants.defaultPadding
    },
    inSameRow : {
        display: "flex", 
        flexDirection: "row",
        justifyContent: "space-between",
    },
    childrenEditView: {
        padding: '10px',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: constants.defaultPadding,
        overflow: 'auto'
    }
});

export const EditForm = (props: EditFormProps) => {

    const { node, getNextID, getNode, scrollToElement, setModalElementEditIsOpen, updateNode } = props;
    const [activeNode, setActiveNode ] = useState(node);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [name, setName] = useState(node.name);
    const [partnerName, setPartnerName] = useState(node.partner);
    const [childrenNames, setChildrenNames] = useState<Map<string, string>>(new Map<string,string>());

    const classes = useStyles();
    const activeAddElementRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(activeAddElementRef.current)
            scrollToElement(activeAddElementRef.current);
    },[activeNode])

    const afterModalElementEditIsOpen = () => {

    }

    const onCloseModalElementEdit = () => {
        setModalIsOpen(false);
        setModalElementEditIsOpen(false);
    }

    const onSaveModalElementEdit = () => {
        //TO DO add all the data to current node
        updateNode(activeNode, name, partnerName, childrenNames);
        setModalIsOpen(false);
        setModalElementEditIsOpen(false);
    }

    const onCancelModalElementEdit = () => {
        setModalIsOpen(false);
        setModalElementEditIsOpen(false);
    }

    const handleChildRemove = (e: any, childID: string) => {
        let updatedNode = cloneDeep(activeNode);
        updatedNode.children = updatedNode.children.filter(id => id !== childID);
        setActiveNode(updatedNode);
    }

    const handleChildAdd = (e: any) => {
        let updatedNode = cloneDeep(activeNode);
        let nextIDtoAssign =  getNextID();
        updatedNode.children.push(nextIDtoAssign);
        let newNamesObj = cloneDeep(childrenNames);
        newNamesObj.set(nextIDtoAssign, e.value);
        setChildrenNames(newNamesObj);
        setActiveNode(updatedNode);
        //scrollToElement(e.currentTarget)
    }

    const onChildNameChange = (e: any, id: string) => {
        console.log(id+"  "+e.value);
        let newNamesObj = cloneDeep(childrenNames);
        newNamesObj.set(id, e.value);
        setChildrenNames(newNamesObj);
    }

    const onPartnerNameChange = (e: any) => {
        console.log(activeNode.id+"  "+e.value);
        setPartnerName(e.value);
    }

    const onNameChange = (e: any) => {
        console.log(activeNode.id+"  "+e.value);
        setName(e.value);
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterModalElementEditIsOpen}
            onRequestClose={onCloseModalElementEdit}
            className={classes.modalStyle}
            ariaHideApp={false}
            contentLabel="Element Edit Modal"
            >
                <Card bordered elevation={5} className={classes.modalEdit}>
                <CardContent className={classes.modalContent}> 
                    <span className={classes.inSameRow}><Subtitle2>Name : </Subtitle2><TextField value={activeNode.name} onChange={onNameChange}></TextField></span>
                    <span className={classes.inSameRow}><Subtitle2>Spouse : </Subtitle2><TextField value={activeNode.partner} onChange={onPartnerNameChange}></TextField></span>
                    <Divider style={{marginBottom:constants.defaultPadding}}/>
                    <div className={classes.childrenEditView}>
                    { 
                        activeNode.children.map((id) => {
                            let name =  childrenNames.get(id) || (getNode(id) ? getNode(id).name : "");
                            return (
                                <span className={classes.inSameRow}>
                                    <Subtitle2>Child :</Subtitle2>
                                    <TextField value={ name } onChange={(e : any)=>onChildNameChange(e, id)}></TextField>
                                    <div style={{padding:constants.defaultPadding}}>
                                    <IconButton rounded text={false} size='small' onClick={(e : Event) => handleChildRemove(e, id)}>
                                        <Icon path={mdiCloseThick} size={0.8} color={constants.defaultLightIconColor}/>
                                    </IconButton>
                                    </div>
                                </span>
                            )
                        })
                    }
                    <div ref={activeAddElementRef}>
                    <IconButton rounded text={false} size='small' onClick={(e : Event) => handleChildAdd(e)}>
                        <Icon path={mdiAccountPlus} size={0.8} color={constants.defaultLightIconColor}/>
                    </IconButton>
                    </div>
                    </div>
                </CardContent>
                <CardAction className={classes.modalButton}>
                    <Button color='var(--primary)' onClick={onCancelModalElementEdit}>
                        Cancel
                    </Button>
                    <Button color='var(--primary)' onClick={onSaveModalElementEdit}>
                        OK
                    </Button>
                </CardAction>
                </Card>
            </Modal>
    )
}
