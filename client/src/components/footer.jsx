import React from 'react'

function footer() {
    return (
        <div>
            <h3 className='head' id='con'>contact</h3>
            <footer class="footer">
            
                <div class="footer-container">
                  
                    <div class="footer-section about">
                        <h3>About Us</h3>
                        <p>บริษัท XYZ เป็นผู้นำด้านการผลิตและจัดจำหน่ายสินค้าคุณภาพสูง เรามุ่งมั่นที่จะส่งมอบสินค้าที่ดีที่สุดให้กับลูกค้าของเรา</p>
                    </div>

                    <div class="footer-section links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">เกี่ยวกับเรา</a></li>
                            <li><a href="#">บริการของเรา</a></li>
                            <li><a href="#">ติดต่อเรา</a></li>
                            <li><a href="#">คำถามที่พบบ่อย</a></li>
                        </ul>
                    </div>

                    <div class="footer-section contact">
                        <h3>Contact Us</h3>
                        <p>ที่อยู่: 123 ถนนหลัก, กรุงเทพฯ, 10200</p>
                        <p>โทรศัพท์: +66 2 123 4567</p>
                        <p>อีเมล: contact@xyzcompany.com</p>
                    </div>

                </div>
                <hr />
                <p class="footer-rights">© 2024 XYZ Company. All rights reserved.</p>
            </footer>

        </div>
    )
}

export default footer
