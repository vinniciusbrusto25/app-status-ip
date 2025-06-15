import express from 'express';
import os from 'os';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (_, res) => {
    res.send('Status ok');
})

function buscarIpLocal() {
    const nets = os.networkInterfaces();
    for (const iface of Object.values(nets)) {
        for (const addr of iface || []) {
            if (addr.family === 'IPv4' && !addr.internal) {
                return addr.address;
            }
        }
    }

    return 'Não encontrado';
}

app.get('/ip-interno', async (_, res) => {
    try {
        const localIp = buscarIpLocal();

        res.render('ip-interno', { localIp });
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao obter ip interno');
    }
})

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));