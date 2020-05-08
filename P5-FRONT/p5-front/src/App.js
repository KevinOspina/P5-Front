import React, { Component } from 'react';
import './App.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import $ from 'jquery';
import ApiConnect from "../../p5-front//src/ApiConnect"

import { cuadrillas } from './bd/cuadrillas.json'
import { empleados } from './bd/empleados.json'
import { tareas } from './bd/tareas.json'
import { ubicaciones } from './bd/ubicaciones.json'
import { asignarEvCuad } from './bd/asignarEvCuad.json'


class App extends Component {

  constructor() {
    super()
    this.api = new ApiConnect()
    this.state = {
      cuadrillas,
      empleados,
      tareas,
      ubicaciones,
      asignarEvCuad,

      //actividades
      actividadID: "",
      tipo: "",
      descripcion: "",
      estado: "",
      responsables: "",
      ubicacionesID: "",


      //eventos
      Id_cuadrillas: '',
      eventosID: '',

      //cuadrillas
      cuadrillaID2: '',
      Id_empleados: '',
      nombreEmpleado: '',




      inEventos: [],
      getActividades: [],
      inCuadrillas: [],
    };
    this.HandleInput = this.HandleInput.bind(this);
  }

  HandleInput(e) {
    const { value, name } = e.target;

    this.setState({
      [name]: value
    })
  }

  onKeyPress = field => {
    return evt => {
      const val = evt.target.value;
      const newState = { ...this.state }
      newState[field] = val;
      this.setState(newState);
    }
  }

  async componentDidMount() {
    $("#seccion1").show();
    $("#seccion2").hide();
    $("#seccion3").hide();
    $("#seccion4").hide();
    this.getActividades()

  }

  mostrar1() {
    $("#seccion1").show();
    $("#seccion2").hide();
    $("#seccion3").hide();
    $("#seccion4").hide();
  };

  mostrar2() {
    $("#seccion1").hide();
    $("#seccion2").show();
    $("#seccion3").hide();
    $("#seccion4").hide();

  };

  mostrar3() {
    $("#seccion1").hide();
    $("#seccion2").hide();
    $("#seccion3").show();
    $("#seccion4").hide();
  };

  mostrar4() {
    $("#seccion1").hide();
    $("#seccion2").hide();
    $("#seccion3").hide();
    $("#seccion4").show();
  };

  inEventos = () => {
    this.api.insertEventos({
      cuadrillas: this.state.Id_cuadrillas,
      eventoID: this.state.eventosID

    })
      .then(res => console.log(res))
      .catch(ex => console.log(ex))
  }

  inCuadrillas = () => {
    this.api.insertCuadrillas({
      Id_cuadrillas: this.state.cuadrillaID2,
      empleadoID: this.state.Id_empleados,
      nombre: this.state.nombreEmpleado

    })
      .then(res => console.log(res))
      .catch(ex => console.log(ex))
  }

  inActividades = () => {
    this.api.insertActividad({
      actividadID: this.state.actividadID,
      tipo: this.state.tipo,
      descripcion: this.state.descripcion,
      estado: this.state.estado,
      responsables: this.state.responsables,
      ubicaciones: this.state.ubicacionesID,

    })
      .then(res => console.log(res))
      .catch(ex => console.log(ex))
  }

  getActividades = async () => {
    var data = await this.api.getActividades({
    })
    this.setState({ getActividades: data.data });
  }


  render() {
    return (
      <div className="container-fluid">

        <form className="container-contact100" action="">
          <div>

            <div className="form-group margin">
              <label className="App-titulo" htmlFor="fotoPerfil">Bienvenido a RouteMe  </label>
            </div>

            <div className="form-group margin">
              <label className="" htmlFor="fotoPerfil"> </label>
            </div>


            <div className="row">

              <div className="form-group row col-lg-3 col-sm-12">
                <button id="disablebtn" type="button" className="Btn-aceptar2" onClick={this.mostrar1}>Actividades</button>
              </div>
              <div className="form-group row col-lg-3 col-sm-12">
                <button id="disablebtn" type="button" className="Btn-aceptar2" onClick={this.mostrar2}>Cuadrillas</button>
              </div>
              <div className="form-group row col-lg-3 col-sm-12">
                <button id="disablebtn" type="button" className="Btn-aceptar2" onClick={this.mostrar3}>Eventos</button>
              </div>
        
            </div>










            <div id="seccion1">
              <div className="row">

                <div className="form-group row col-lg-12 col-sm-12">
                  <label htmlFor="Id_categoria" className="App-subtitulo2">ACTIVIDADES:</label>

                </div>

              </div>


              <div className="row">

                <div className="form-group row col-lg-6 col-sm-12 mr-2">

                  <label className="App-subtitulo2" htmlFor="actividadID">Actividad:</label>
                  <input Style="background-color:transparent;" type="text" onChange={this.HandleInput}
                    value={this.state.actividadID} className=" form-control Input-Style" id="actividadID" name="actividadID" placeholder="Id de la actividad" />


                </div>
                <div className="form-group row col-lg-6 col-sm-12 mr-2">

                  <div className="valid-feedback">Validado.</div>
                  <div className="invalid-feedback">Por favor rellene este campo.</div>

                  <label className="App-subtitulo2" htmlFor="tipo">Tipo:</label>
                  <select onChange={this.onKeyPress('tipo')} className="form-control Input-Style">
                    <option>Seleccione el evento</option>
                    {this.state.tareas.map((data) => {
                      return (
                        <option value={data.tipo}>{data.tipo}</option>
                      );
                    })}
                  </select>
                  <div className="valid-feedback">Validado.</div>
                  <div className="invalid-feedback">Por favor rellene este campo.</div>

                </div>
              </div>


              <div className="row">

                <div className="form-group row col-lg-6 col-sm-12 mr-2">

                  <label className="App-subtitulo2" htmlFor="descripcion">Descripción:</label>
                  <input Style="background-color:transparent;" type="text" onChange={this.HandleInput}
                    value={this.state.descripcion} className=" form-control Input-Style" id="descripcion" name="descripcion" placeholder="Id empleado" />
                  <div className="valid-feedback">Validado.</div>
                  <div className="invalid-feedback">Por favor rellene este campo.</div>

                </div>


                <div className="form-group row col-lg-6 col-sm-12 mr-2">

                  <label className="App-subtitulo2" htmlFor="estado">Estado:</label>
                  <select onChange={this.onKeyPress('estado')} className="form-control Input-Style">
                    <option>Seleccione el estado de la actividad</option>
                    <option>En curso</option>
                    <option>Finalizado</option>
                    <option>Pendiente</option>

                  </select>
                  <div className="valid-feedback">Validado.</div>
                  <div className="invalid-feedback">Por favor rellene este campo.</div>

                </div>

              </div>

              <div className="row">

                <div className="form-group row col-lg-6 col-sm-12 mr-2">

                  <label className="App-subtitulo2" htmlFor="responsables">Responsables:</label>
                  <input Style="background-color:transparent;" type="text" onChange={this.HandleInput}
                    value={this.state.responsables} className=" form-control Input-Style" id="responsables" name="responsables" placeholder="Id empleado" />
                  <div className="valid-feedback">Validado.</div>
                  <div className="invalid-feedback">Por favor rellene este campo.</div>

                </div>

                <div className="form-group row col-lg-6 col-sm-12 mr-2">

                  <label className="App-subtitulo2" htmlFor="ubicacionesID">Ubicaciones:</label>
                  <select onChange={this.onKeyPress('ubicacionesID')} className="form-control Input-Style">
                    <option>Seleccione el evento</option>
                    {this.state.ubicaciones.map((data) => {
                      return (
                        <option value={data.ubicacionID}>{data.ubicacionID}{" | "}{data.coordenadas.latitud}{" | "}{data.coordenadas.longitud}  </option>
                      );
                    })}
                  </select>
                  <div className="valid-feedback">Validado.</div>
                  <div className="invalid-feedback">Por favor rellene este campo.</div>

                </div>

              </div>


              <div className="row">
                <div className="form-group row col-lg-4 col-sm-12 mr-2"></div>
                <div className="form-group row col-lg-8 col-sm-12 mr-2">
                  <button id="disablebtn" type="button" onClick={() => {this.inActividades(); this.mostrar1()}} className="Btn-aceptar">Guardar</button>
                </div>
              </div>


              <div className="form-group row col-lg-12 col-sm-12 mr-2">

                <Table className="table table-bordered ">
                  <Thead>
                    <Tr className="App-titulo2 ">
                      {/*Encabezado de la tabla de jugadores */}

                      <Th scope="col">Id Actividad</Th>
                      <Th scope="col">Tipo</Th>
                      <Th scope="col">Descripcion evento</Th>
                      <Th scope="col">Estado</Th>
         

                    </Tr>
                  </Thead>
                  <Tbody>
                    {this.state.getActividades.map((data) => {
                      return (
                        <Tr data-test="event-row" className="bg-light">
                          <Td>{data.actividadID}</Td>
                          <Td>{data.tipo}</Td>
                          <Td>{data.descripcion}</Td>
                          <Td>{data.estado}</Td>
              
                        </Tr>
                      );
                    })
                    }
                  </Tbody>
                </Table>

              </div>





            </div>















            <div id="seccion2">
              <div className="row">

                <div className="form-group row col-lg-12 col-sm-12">
                  <label htmlFor="Id_categoria" className="App-subtitulo2">CUADRILLAS:</label>

                </div>

                <div className="form-group row col-lg-12 col-sm-12 mr-2">

                  <label className="App-subtitulo2" htmlFor="cuadrillaID2">Cuadrilla:</label>
                  <input Style="background-color:transparent;" type="text" onChange={this.HandleInput}
                    value={this.state.cuadrillaID2} className=" form-control Input-Style" id="cuadrillaID2" name="cuadrillaID2" placeholder="Poner Id de la cuadrilla" />
                  <div className="valid-feedback">Validado.</div>
                  <div className="invalid-feedback">Por favor rellene este campo.</div>

                </div>
              </div>
              <div className="row">

                <div className="form-group row col-lg-6 col-sm-12 mr-2">

                  <label className="App-subtitulo2" htmlFor="Id_empleados">Empleados:</label>
                  <input Style="background-color:transparent;" type="text" onChange={this.HandleInput}
                    value={this.state.Id_empleados} className=" form-control Input-Style" id="Id_empleados" name="Id_empleados" placeholder="Id empleado" />
                  <div className="valid-feedback">Validado.</div>
                  <div className="invalid-feedback">Por favor rellene este campo.</div>

                </div>


                <div className="form-group row col-lg-6 col-sm-12 mr-2">

                  <label className="App-subtitulo2" htmlFor="nombreEmpleado">Nombre Empleado:</label>
                  <input Style="background-color:transparent;" type="text" onChange={this.HandleInput}
                    value={this.state.nombreEmpleado} className=" form-control Input-Style" id="nombreEmpleado" name="nombreEmpleado" placeholder="Nombre empleado" />
                  <div className="valid-feedback">Validado.</div>
                  <div className="invalid-feedback">Por favor rellene este campo.</div>

                </div>

              </div>

              <div className="row">
                <div className="form-group row col-lg-4 col-sm-12 mr-2"></div>
                <div className="form-group row col-lg-8 col-sm-12 mr-2">
                  <button id="disablebtn" type="button" onClick={this.inCuadrillas} className="Btn-aceptar">Guardar</button>
                </div>
              </div>
            </div>










            <div id="seccion3">
              <div className="row">

                <div className="form-group row col-lg-12 col-sm-12">
                  <label htmlFor="Id_categoria" className="App-subtitulo2">TAREAS/EVENTOS:</label>
                </div>
              </div>

              <div className="row">

                <div className="form-group row col-lg-6 col-sm-12 mr-2">

                  <label className="App-subtitulo2" htmlFor="Id_cuadrillas">Cuadrillas id:</label>
                  <input Style="background-color:transparent;" type="text" onChange={this.HandleInput}
                    value={this.state.Id_cuadrillas} className=" form-control Input-Style" id="Id_cuadrillas" name="Id_cuadrillas" />
                  <div className="valid-feedback">Validado.</div>
                  <div className="invalid-feedback">Por favor rellene este campo.</div>

                </div>

                <div className="form-group row col-lg-6 col-sm-12 mr-2">

                  <label className="App-subtitulo2" htmlFor="eventosID">Tipo de evento:</label>
                  <select onChange={this.onKeyPress('eventosID')} className="form-control Input-Style">
                    <option>Tipo</option>
                    <option>Inicidente</option>
                    <option>Mantenimiento</option>
                    <option>F</option>
                  </select>
                  <div className="valid-feedback">Validado.</div>
                  <div className="invalid-feedback">Por favor rellene este campo.</div>

                </div>
              </div>




              <div className="row">
                <div className="form-group row col-lg-4 col-sm-12 mr-2"></div>
                <div className="form-group row col-lg-8 col-sm-12 mr-2">
                  <button id="disablebtn" type="button" onClick={this.inEventos} className="Btn-aceptar">Guardar</button>
                </div>
              </div>
            </div>











            <div id="seccion4">
              <div className="form-group row col-lg-12 col-sm-12">
                <label htmlFor="Id_categoria" className="App-subtitulo2">ASIGNAR UNA TAREA A UNA CUADRILLA:</label>

              </div>

              <div className="row">
                <div className="form-group row col-lg-12 col-sm-12">

                  <label className="App-subtitulo2" htmlFor="cantJugadores" >Evento:</label>
                  <select className="form-control Input-Style">
                    <option>Seleccione el evento</option>
                    {this.state.tareas.map((data) => {
                      return (
                        <option>{data.tipo}{" - "}{data.descripción}</option>
                      );
                    })}
                  </select>
                </div>

              </div>

              <div className="row">

                <div className="form-group row col-lg-12 col-sm-12 mr-2">

                  <label className="App-subtitulo2" htmlFor="jugxgrupo">Cuadrilla:</label>
                  <select className="form-control Input-Style">
                    <option>Seleccione la cuadrilla</option>
                    {this.state.cuadrillas.map((data) => {
                      return (
                        <option>{data.nombre}{" - "}{data.descripción}</option>
                      );
                    })}
                  </select>
                </div>


              </div>


              <div className="row">
                <div className="form-group row col-lg-4 col-sm-12 mr-2"></div>
                <div className="form-group row col-lg-8 col-sm-12 mr-2">
                  <button id="disablebtn" type="button" className="Btn-aceptar">Guardar</button>
                </div>
              </div>


              <div className="form-group row col-lg-12 col-sm-12">
                <label htmlFor="Id_categoria" className="App-subtitulo2">ALGUNAS TAREAS YA ASIGNADAS A UNA CUADRILLA:</label>

              </div>



            </div>















          </div>


        </form>
      </div>
    );
  }
}
export default App;
