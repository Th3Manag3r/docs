# Changing The Default Arabic Font In Linux
currently using CachyOs

```bash
sudo chmod 644 assets/arabic-fonts/**/*
sudo cp -r assets/arabic-fonts/* 
mkdir ~/.config/fontconfig
cp assets/fonts.conf ~/.config/fontconfig
sudo fc-cache -fv
```
