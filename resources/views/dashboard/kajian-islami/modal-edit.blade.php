
<div class="modal fade" id="editkajian-{{ $item->id }}" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Edit Kajian Islami</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form action="/dashboard/kajian-islami/{{ $item->id }}/update" method="POST"
                                                enctype="multipart/form-data">
                                                @csrf
                                                <div class="mb-3">
                                                    <label for="recipient-name" class="col-form-label">Judul <span
                                                            style="color: red">*</span></label>
                                                    <input type="text" class="form-control" name="judul"
                                                        value="{{ $item->judul }}" required>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="message-text" class="col-form-label">Waktu <span
                                                            style="color: red">*</span></label>
                                                    <input class="form-control" name="waktu"
                                                        value="{{ $item->waktu }}" required></input>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="recipient-name" class="col-form-label">Tempat <span style="color: red">*</span></label>
                                                    <input type="text" class="form-control" name="tempat"
                                                        value="{{ $item->tempat }}" required>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="recipient-name" class="col-form-label">Pemateri<span style="color: red">*</span></label>
                                                    <input type="text" class="form-control" name="pemateri"
                                                        value="{{ $item->pemateri }}" required>
                                                </div>
                                {{--                 <div class="mb-3"> --}}
                                {{--                     <label for="message-text" class="col-form-label">Jenis Kajian <span --}}
                                {{--                             style="color: red">*</span></label> --}}
                                {{--                     <div class="form-check"> --}}
                                {{--                         <input class="form-check-input" type="radio" name="jeniskajian"> --}}
                                {{--                         <label class="form-check-label">Umum (Terbuka untuk siapapun) --}}
                                {{--                         </label> --}}
                                {{--                     </div> --}}
                                {{--                     <div class="form-check"> --}}
                                {{--                         <input class="form-check-input" type="radio" name="jeniskajian" --}}
                                {{--                             checked> --}}
                                {{--                         <label class="form-check-label">Khusus (Hanya pengurus / orang --}}
                                {{--                             tertentu yang dapat --}}
                                {{--                             mengikuti) --}}
                                {{--                         </label> --}}
                                {{--                     </div> --}}
                                {{--                 </div> --}}
                                {{--                 <div class="mb-3"> --}}
                                {{--                     <label for="message-text" class="col-form-label">Materi Kajian dan --}}
                                {{--                         Waktu Kajian <span style="color: red">*</span></label> --}}
                                {{--                     <input class="form-control" name="judul" --}}
                                {{--                         value="{{ $item->judul }}" placeholder="Contoh : --}}
                                {{-- Ceramah Harian (08.00 - 09.00 WITA), --}}
                                {{-- Pengkajian Alquran (20.00 - 21.00), --}}
                                {{-- Pengkajian Alhadist (10.00 - 10.30 WITA) " required></input> --}}
                                {{--                 </div> --}}

                                {{--                 <div class="mb-3"> --}}
                                {{--                     <img src="{{ asset('gambar') }}/{{ $item->gambar }}" --}}
                                {{--                         alt="Gambar tidak terbaca" style="width: 100px"><br> --}}
                                {{--                     <label for="recipient-name" class="col-form-label">Gambar Masjid --}}
                                {{--                         <span style="color: red">*</span></label> --}}
                                {{--                     <input type="file" class="form-control" name="gambar" required> --}}
                                {{--                 </div> --}}
                                                <div class="mb-3">
                                                    <label for="recipient-name" class="col-form-label">Titik Koordinat
                                                        <span style="color: red">*</span></label>
                                                    <input type="text" class="form-control" id="latlong" name="latlong"
                                                        placeholder="{{ $item->latlong }}" required readonly>
                                                </div>
                                                <div class="mb-3">
                                                    <a onclick="getlokasi('mapid-{{ $item->id }}')" class="btn btn-secondary me-1">Tampilkan
                                                        Lokasi</a>
                                                    <p id="capa"></p>
                                                </div>
                                                <div class="mb-3">
                                                    <div id='mapid-{{ $item->id }}' style='min-height: 300px;'>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
