import { View, Text } from "react-native"

const About = () => {
    return (
        <View>
            <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
                <Text style={{ fontSize: 30, fontWeight: "300" }}>About Us</Text>
            </View>
            <View style={{ paddingHorizontal: 15 }}>
                <Text style={{ fontWeight: "300" }}>
                    Flinkit is India's most beloved online grocery shopping platform. Our app is changing the way customers approach their daily essentials. You can now shop online for groceries, fresh fruits and vegetables procured daily, dairy & bakery, beauty & wellness, personal care, household care, diapers & baby care, pet care, meats and seafood as well as the latest products from leading brands like Cadbury, ITC, Colgate-Palmolive, PepsiCo, Aashirvaad, Saffola, Fortune, Nestle, Amul, Dabur, and many more. Imagine if you could get anything delivered to you in minutes. Milk for your morning chai. The perfect shade of lipstick for tonight's party. Even an iPhone.
                    <View style={{ paddingVertical: 5 }}><Text>{"\n"}</Text></View>
                    Our superfast delivery service aims to help consumers in India save time and fulfill their needs in a way that is frictionless. We will make healthy, high-quality and life-improving products available to everyone instantly so that people can have time for the things that matter to them.
                    <View style={{ paddingVertical: 5 }}><Text>{"\n"}</Text></View>
                    'Blinkit' is owned & managed by 'Blink Commerce Private Limited' (formerly known as Grofers India Private Limited) and is not related, linked or interconnected in whatsoever manner or nature, to 'GROFFR.COM' which is a real estate services business operated by 'Redstone Consultancy Services Private Limited'.
                </Text>
            </View>
        
            <View style={{marginTop:60}}>
            <Text style={{borderBottomWidth:1,borderColor:"rgb(183,183,183)"}}></Text>
                <View style={{ marginTop: "20", paddingHorizontal: 15,paddingVertical:10}}>
                    <Text style={{fontSize:15,fontWeight:300}}>Privacy Policy</Text>
                </View>
                <Text style={{borderBottomWidth:1,borderColor:"#d4d2d2"}}></Text>
                <View style={{ paddingHorizontal: 15,paddingVertical:10 }}>
                    <Text style={{fontSize:15,fontWeight:300}}>Terms & Conditions</Text>
                </View>
            </View>
        </View>
    )
}

export default About;