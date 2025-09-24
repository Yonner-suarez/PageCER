if (process.env.NODE_ENV !== "production") {
  window._env_ = {
    // GATEWAY_CER: process.env.REACT_APP_GATEWAY_CER,
  };
}

let BASE;

if (process.env.NODE_ENV !== "production") {
  //todo: LocalHost
  BASE = "http://localhost:5144/";
} else {
  //todo: QA PROD
  BASE = window._env_.GATEWAY_CER;
}

export { BASE };

export const usuarios = {
  LOGINCLIENTE: "/usuarios/v1/Cliente/Login",
  DELETECUENTACLIENTE: "usuarios/v1/Cliente",
  OBTENERCLIENTE: "usuarios/v1/Cliente",
  LOGINADMIN: "usuarios/v1/Empleado/Login",
  CREAREMPLEADO: "usuarios/v1/Empleado",
  OBTENEREMPLEADO: "usuarios/v1/{idEmpleado}",
  OBTENEREMPLEADOS: "usuarios/v1/Empleado/Empleados",
  ELIMINAREMPLEADOS: "usuarios/v1/Empleado/{idEmpleado}/{idAdmin}",
};

export const inventario = {
  AGREGARPRODUCTO: "/inventario/v1/Inventario/Producto",
  ACTUALIZARCANTIDAD:
    "/inventario/v1/Inventario/CantidadProducto/{IdProducto}/{nuevaCantidad}",
  ELIMINARPRODUCTO: "/inventario/v1/Inventario/Producto/{IdProducto}",
  ACTUALIZARPRODUCTODATA: "/inventario/v1/Inventario/ProductoData/{idProducto}",
  PRODUCTOBYID: "/inventario/v1/Inventario/ProductoById/{idProducto}",
  PRODUCTOS: "/inventario/v1/Inventario/Productos",
};

export const pedidosAPI = {
  REPORTE: "/pedidos/v1/Pedido/Reporte",
  CARRITO: "/pedidos/v1/Pedido/Carrito",
  ESTADOPEDIDO: "/pedidos/v1/Pedido/EstadoPedido/{idPedido}/{estado}",
  PEDIDOS: "/pedidos/v1/Pedido/Pedidos",
  PEDIDODETALLE: "/pedidos/v1/Pedido/PedidoDetalle/{idPedido}",
};

export const catalogoProductos = {
  PRODUCTOS: "/catalogoProductos/v1/Catalogo/productos",
  MARCAS: "/catalogoProductos/v1/Catalogo/marcas",
  CATEGORIAS: "/catalogoProductos/v1/Catalogo/categorias",
};
export const pagos = {
  PRODUCTOS: "/catalogo/v1/Catalogo/productos",
};
