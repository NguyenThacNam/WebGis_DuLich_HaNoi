const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'webgis_HaNoi',
    password: 'postgres',
    port: 5432,
});

//login admin
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM admin WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const admin = result.rows[0];
          
            if (admin.password === password) {
                res.status(200).json({ success: true });
            } else {
                res.status(401).send('Sai mật khẩu');
            }
        } else {
            res.status(401).send('Sai tên đăng nhập');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi đăng nhập');
    }
});



// lấy danh sách
app.get('/places', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM places');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving places');
    }
});

// thêm
app.post('/places', async (req, res) => {
    const { name, category, description, latitude, longitude, image_url, location } = req.body;

    try {
        await pool.query(
            `INSERT INTO places (name, category, description, latitude, longitude, image_url, location) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [name, category, description, latitude, longitude, image_url, location]
        );
        res.status(201).send('Place added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding place');
    }
});

// sửa
app.put('/places/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category, description, latitude, longitude, image_url, location } = req.body;

    try {
        await pool.query(
            `UPDATE places 
             SET name = $1, category = $2, description = $3, latitude = $4, longitude = $5, image_url = $6, location = $7 
             WHERE id = $8`,
            [name, category, description, latitude, longitude, image_url, location, id]
        );
        res.status(200).send('Place updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating place');
    }
});

// Xóa 
app.delete('/places/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM places WHERE id = $1', [id]);
        res.status(200).send('Place deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting place');
    }
});
// chi tiết địa điểm
app.get('/places/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM places WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Không tìm thấy địa điểm');
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send('Lỗi server');
    }
});


app.listen(3000, () => console.log('Server running on port 3000'));
