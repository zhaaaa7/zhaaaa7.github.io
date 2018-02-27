import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler=(WrappedComponent,axios)=>{
    return class extends Component {
        state={
            error:null
        };


        // intercept requests or responses before they are handled by then or catch
        //happens before children are rendered, so error handler can be used on children
        componentWillMount(){ 
            this.reqIntercepter=axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });
            this.resIntercepter=axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
            });
        }

        //remove interceptors
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqIntercepter);
            axios.interceptors.request.eject(this.resIntercepter);
        }

        //set the error back to null after clicking the backdrop, i.e know the error
        errorConfirmedHandler=()=>{
            this.setState({error:null});
        }
        render(){
            return(
                <Aux>
                    <Modal 
                    show={this.state.error} 
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error?this.state.error.message:null}
                    </Modal>
                
                <WrappedComponent {...this.props} />
                </Aux>
            );
        }
        
    };
};

export default withErrorHandler;