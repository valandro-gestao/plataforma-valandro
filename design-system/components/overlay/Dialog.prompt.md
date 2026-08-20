Modal dialog for confirmations and short forms. Backdrop click or `onClose` dismisses.

```jsx
<Dialog open={open} title="Confirmar envio" onClose={close} actions={<><Button variant="ghost" onClick={close}>Cancelar</Button><Button onClick={confirm}>Confirmar</Button></>}>
  O relatório será enviado ao cliente.
</Dialog>
```
