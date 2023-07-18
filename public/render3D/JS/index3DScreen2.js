import * as THREE from "./three.module.js"
import {GLTFLoader} from "./GLTFLoader.js"
import { OrbitControls } from "./OrbitControls.js";// cho phép quay và room camera trong môi trường 3d

let canvas, ID_home
let scene, camera, renderer, controls;
let Phoi_len_xuong_2, Can_gat_phoi, Tram_kiem_tra_thieu, Module_kiem_tra, Module_nang_ha, Phoi_truot_khi_2, Phoi_truot_duoi
let done_load_3D = false;
let speed_quay = 8;
let speed_capPhoi = 2;
let diChuyenCaHe = 0.4;
const element = document.getElementById("_3dTram2_HW");
function changeColorObject( Object, colorObject ) {
    Object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            // set the object color
            child.material.color.setHex(colorObject);
        }
    });
}
async function init() {
    // độ rộng khung hình chứa
    var sizes = {
        width: element.clientWidth,
        height: element.clientWidth
    }
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x9a9a9a);// tạo màu nền cho cảnh 3D, nền màu xám đậm

    // gần xa camera
    camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.01, 10000)
    //vị trí camera
    camera.position.x = 1;
    camera.position.y = 1.52;
    camera.position.z = -0.8;
    scene.add(camera)
    
    controls = new OrbitControls(camera,canvas);
    controls.addEventListener('change', renderer);

    const light5 = new THREE.DirectionalLight(0xffffff, 0.5)// nguồn sáng màu trắng, độ sáng 0.5
    light5.position.set(0,0,-500)
    scene.add(light5)
    const light6 = new THREE.DirectionalLight(0xffffff, 0.5)
    light6.position.set(0,0,500)
    scene.add(light6)
    const light1 = new THREE.DirectionalLight(0xffffff, 0.5)
    light1.position.set(500,0,0)
    scene.add(light1)

    // renderer = new THREE.WebGLRenderer({antialias:true});
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    }) 

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // liên quan đến chi tiết vật
    renderer.shadowMap.enabled = true
    renderer.gammaOutput = true

    let loader = new GLTFLoader();

    await Promise.all([
        await loader.load('render3D/3D_Tram2/Tram_kiem_tra_thieu.glb', function (glb) {
            done_load_3D = true;
            // tỉ lệ
            Tram_kiem_tra_thieu = glb.scene
            Tram_kiem_tra_thieu.scale.set(1, 1, 1);
            // vị trí vật
            Tram_kiem_tra_thieu.position.x = 0+diChuyenCaHe;
            Tram_kiem_tra_thieu.position.y = 0;
            Tram_kiem_tra_thieu.position.z = 0-diChuyenCaHe;
            scene.add(Tram_kiem_tra_thieu); // thêm vào màn hình
        }),
        await loader.load('render3D/3D_Tram2/Module_kiem_tra.glb', function (glb) {
        Module_kiem_tra = glb.scene
        // tỉ lệ
        Module_kiem_tra.scale.set(1, 1, 1);
        // vị trí vật
        Module_kiem_tra.position.x = -0.02528992 + diChuyenCaHe;
        Module_kiem_tra.position.y = 1.1484098434793;
        Module_kiem_tra.position.z = 0.1094810 - diChuyenCaHe;
        Module_kiem_tra.rotation.x = Math.PI;
        Module_kiem_tra.rotation.y = Math.PI/2;
        scene.add(Module_kiem_tra); // thêm vào màn hình
        }),
        await loader.load('render3D/3D_Tram2/Phoi_cao-Mau_do.glb', function (glb) {
            Phoi_truot_khi_2 = glb.scene;
            // Phoi_cao_Mau_do = new THREE.Mesh( glb, new THREE.MeshLambertMaterial( { color: 0xbbbbbb} ));
            // tỉ lệ
            Phoi_truot_khi_2.scale.set(1, 1, 1);
            // vị trí vật -0.0029999 290.2955253970300000 873.1011575459400000
            Phoi_truot_khi_2.position.x = -0.0029999 + diChuyenCaHe;
            Phoi_truot_khi_2.position.y = 0.87310115;
            Phoi_truot_khi_2.position.z = -0.2902955 + 0.34 - diChuyenCaHe;
            Phoi_truot_khi_2.rotation.x = -14.68385579 * (Math.PI / 180); 
            changeColorObject(Phoi_truot_khi_2, 0xFF4500)
            Phoi_truot_khi_2.visible = false
            scene.add(Phoi_truot_khi_2); // thêm vào màn hình
        }),
        await loader.load('render3D/3D_Tram2/Phoi_cao-Mau_do.glb', function (glb) {
            Phoi_truot_duoi = glb.scene;
            // Phoi_cao_Mau_do = new THREE.Mesh( glb, new THREE.MeshLambertMaterial( { color: 0xbbbbbb} ));
            // tỉ lệ
            Phoi_truot_duoi.scale.set(1, 1, 1);
            // vị trí vật -0.0029999 290.2955253970300000 873.1011575459400000
            Phoi_truot_duoi.position.x = -0.0029999 + diChuyenCaHe;
            Phoi_truot_duoi.position.y = 0.727;
            Phoi_truot_duoi.position.z = -0.2902955 + 0.34 - diChuyenCaHe; 
            changeColorObject(Phoi_truot_duoi, 0xAAFF00) 
            Phoi_truot_duoi.visible = false
            scene.add(Phoi_truot_duoi); // thêm vào màn hình
        }),
        await loader.load('render3D/3D_Tram2/Module_nang_ha.glb', async function (glb) {
                Module_nang_ha = glb.scene;
                // tỉ lệ
                Module_nang_ha.scale.set(1, 1, 1);
                // vị trí vật
                Module_nang_ha.position.x = 0.051 + diChuyenCaHe;
                Module_nang_ha.position.y = 0.727158517777;
                Module_nang_ha.position.z = 0.1575 - diChuyenCaHe;
                Module_nang_ha.rotation.y = Math.PI / 2;
                // changeColorObject(Phoi_cao_Mau_do_day, 0xFF4500)
                scene.add(Module_nang_ha); // thêm vào màn hình

            await loader.load('render3D/3D_Tram2/Can_gat_phoi.glb', function (glb) {
                Can_gat_phoi = glb.scene;
                // Phoi_cao_Mau_do = new THREE.Mesh( glb, new THREE.MeshLambertMaterial( { color: 0xbbbbbb} ));
                // tỉ lệ
                Can_gat_phoi.scale.set(1, 1, 1);
                // vị trí vật
                Can_gat_phoi.position.x = 0.01665851777777;
                Can_gat_phoi.position.y = 0;
                Can_gat_phoi.position.z = -0.054;
                Can_gat_phoi.rotation.z = -Math.PI / 2;
                Can_gat_phoi.rotation.x = Math.PI / 2;
                Module_nang_ha.add(Can_gat_phoi); // thêm vào màn hình
            });
            await loader.load('render3D/3D_Tram2/Phoi_cao-Mau_do.glb', function (glb) {
                Phoi_len_xuong_2 = glb.scene;
                // Phoi_cao_Mau_do = new THREE.Mesh( glb, new THREE.MeshLambertMaterial( { color: 0xbbbbbb} ));
                // tỉ lệ
                Phoi_len_xuong_2.scale.set(1, 1, 1);
                // vị trí vật
                Phoi_len_xuong_2.position.x = 0.0505;
                Phoi_len_xuong_2.position.y = 0;
                Phoi_len_xuong_2.position.z = -0.054;
                changeColorObject(Phoi_len_xuong_2, 0xFF4500)
                Phoi_len_xuong_2.visible = false
                Module_nang_ha.add(Phoi_len_xuong_2); // thêm vào màn hình
            }); 
        }),
    ])
     const axesHelper = new THREE.AxesHelper( 5 );
     scene.add( axesHelper ); // thêm vào màn hình
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene,camera);

    if (done_load_3D == true) {
        // điều kiện xuất hiện phôi lên xuống
        if ((_2_2B1 == true) && (_2_2B7 == false) && (Phoi_truot_khi_2.visible == false)) {
            Phoi_len_xuong_2.visible = true;
        }
        ////////////////////////////////////////////////////////////////
        // xy lanh nâng hạ phôi
        let gioi_han_xy_lanh_len = 0.95
        // lên hết
        if ( _2_3PV1 == true) {
                if (Module_nang_ha.position.y < gioi_han_xy_lanh_len) {
                    // xy lanh lên
                    Module_nang_ha.position.y = Module_nang_ha.position.y + 0.001* speed_capPhoi;
                    if ( Module_nang_ha.position.y > (gioi_han_xy_lanh_len - 0.03)){
                        // kiểm tra chiều cao phôi lến
                        Module_kiem_tra.position.y = Module_kiem_tra.position.y + 0.001* speed_capPhoi;
                    }
                }  
        }
        ////////////////////////////////////////////////////////////////
        // điều kiện để đổi màu phôi tương ứng
        if (_2_2B2 == true) {
            changeColorObject(Phoi_len_xuong_2, 0xFF4500);    // đỏ
        } else if (_2_2B2 == false ) {
            changeColorObject(Phoi_len_xuong_2, 0xAAFF00);    //đen
        }
        // xy lanh nâng hạ đi xuống hết
        let gioi_han_xy_lanh_duoi = 0.727158
        if ((_2_3PV2 == true) && (_2_2B2 == false)){
            if (Module_nang_ha.position.y > gioi_han_xy_lanh_duoi) {
                Module_nang_ha.position.y = Module_nang_ha.position.y - 0.002* speed_capPhoi;
                if (Module_kiem_tra.position.y > 1.1484) {
                    // kiểm tra chiều cao phôi xuống
                    Module_kiem_tra.position.y = Module_kiem_tra.position.y - 0.002* speed_capPhoi;
                }
            }
            changeColorObject(Phoi_len_xuong_2, 0xAAFF00); // đen
        }
        ////////////////////////////////////////////////////////////////
        // xuống giữa
        let gioi_han_xy_lanh_giua = 0.879158
        if ((_2_3PV2 == true) && (_2_2B2 == true)) {
            if (Module_nang_ha.position.y > gioi_han_xy_lanh_giua) {
                Module_nang_ha.position.y = Module_nang_ha.position.y - 0.001* speed_capPhoi;
                if (Module_kiem_tra.position.y > 1.1484) {
                    // kiểm tra chiều cao phôi xuống
                    Module_kiem_tra.position.y = Module_kiem_tra.position.y - 0.001* speed_capPhoi;
                }
            }
            changeColorObject(Phoi_len_xuong_2, 0xFF4500) //đỏ
        }
        ////////////////////////////////////////////////////////////////
        // đấy phôi trạm 2
        let gioi_han_gat_phoi_ra = 0.075
        let gioi_han_gat_phoi_ve = 0.0167
        // đấy phôi trạm 2 đẩy hết
        if (_2_3PV3 == true){
            if (Can_gat_phoi.position.x < gioi_han_gat_phoi_ra){
                Can_gat_phoi.position.x =  Can_gat_phoi.position.x + 0.002* speed_capPhoi;
                Phoi_len_xuong_2.position.x =  Phoi_len_xuong_2.position.x + 0.002* speed_capPhoi;
            }
            if (Module_nang_ha.position.y > gioi_han_xy_lanh_giua) {
                changeColorObject(Phoi_len_xuong_2, 0xFF4500) //đỏ 
            }
        } else if (_2_3PV3 == false) {
            if (Can_gat_phoi.position.x > gioi_han_gat_phoi_ve)
            {
                Can_gat_phoi.position.x =  Can_gat_phoi.position.x - 0.002* speed_capPhoi;
                //ẩn phôi đỏ xy lanh đẩy
                Phoi_len_xuong_2.visible = false
                // phôi về vị trí ban đầu
                Phoi_len_xuong_2.position.x = 0.0505;
                if (Module_nang_ha.position.y > (gioi_han_xy_lanh_giua - 0.1)) {
                    // hiện phôi trượt khí
                    Phoi_truot_khi_2.visible = true
                }
                if (Module_nang_ha.position.y < (gioi_han_xy_lanh_duoi + 0.01 )) {
                    Phoi_truot_duoi.position.z = -0.2902955 + 0.34 - diChuyenCaHe; 
                    // hiện phôi trượt dưới
                    Phoi_truot_duoi.visible = true
                }
            }
        }
        ////////////////////////////////////////////////////////////////
        let gioi_han_Phoi_truot_duoi = -0.019 - diChuyenCaHe
        if ((Phoi_truot_duoi.visible == true) && (Phoi_truot_duoi.position.z > gioi_han_Phoi_truot_duoi)) {
            Phoi_truot_duoi.position.z = Phoi_truot_duoi.position.z - 0.002* speed_capPhoi;
        }
        ////////////////////////////////////////////////////////////////
        // console.log(Phoi_truot_duoi.position.z) > -0.422295 gioi_han_Phoi_truot_duoi?
        // phôi trượt qua máng trượt khí
        let gioi_han_phoi_truot_khi = -0.542295 + 0.34 - diChuyenCaHe
        if ( _2_3PV4 == true ){
            if (Phoi_truot_khi_2.position.z > gioi_han_phoi_truot_khi && Phoi_len_xuong_2.visible == false && Phoi_truot_khi_2.visible == true) {
                Phoi_truot_khi_2.position.z =  Phoi_truot_khi_2.position.z - 0.0015* speed_capPhoi;
                Phoi_truot_khi_2.position.y =  Phoi_truot_khi_2.position.y - 0.000375* speed_capPhoi;
                if (Phoi_truot_khi_2.position.z < gioi_han_phoi_truot_khi) {
                    Phoi_truot_khi_2.visible = false;
                }
            }
        } else if (_2_3PV4 == false) {
            Phoi_truot_khi_2.position.y = 0.87310115;
            Phoi_truot_khi_2.position.z = -0.2902955 + 0.34 - diChuyenCaHe;
        }
        ////////////////////////////////////////////////////////////////
    }
}
// phải viết các hàm đọc sự kiện đứng trước {init (hàm lặp vô tận)}
document.getElementById("ban_dau").onclick = function() {
    // ban đầu
    camera.position.set(1, 1.52, -0.8);
    controls.update();  
};
ID_home = '._3dTram2'
canvas = document.querySelector(ID_home)
init();


